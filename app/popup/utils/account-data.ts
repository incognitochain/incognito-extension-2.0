import { Connection, PublicKey } from "@solana/web3.js"
import { Token as SPLToken } from "@solana/spl-token"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"
import { BalanceInfo, OwnedAccount } from "../types"
import { Buffer } from "buffer"
import { Token } from "@core/types"

export const ACCOUNT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(32, "mint"),
  BufferLayout.blob(32, "owner"),
  BufferLayout.nu64("amount"),
  BufferLayout.blob(48),
])

export const parseTokenAccountData = (
  data: Buffer
): { mintPublicKey: PublicKey; owner: PublicKey; amount: bigint } => {
  let { mint, owner, amount } = ACCOUNT_LAYOUT.decode(data)
  return {
    mintPublicKey: new PublicKey(mint),
    owner: new PublicKey(owner),
    amount: BigInt(amount),
  }
}

export const isSPLAccount = (ownedAccount: OwnedAccount<Buffer>): boolean => {
  // if (TOKEN_PROGRAM_ID.equals(ownedAccount.accountInfo.owner)) {
  //   return true
  // } else {
  //   return false
  // }
  return true;
}

export const getBalanceInfo = async (
  connection: Connection,
  tokenGetter: (mintAddress: string) => Token | undefined,
  ownedAccount: OwnedAccount<Buffer>
): Promise<BalanceInfo | undefined> => {
  // Todo: remove undefine
  if (!isSPLAccount(ownedAccount)) {
    // if not account assume based account
    return {
      amount: BigInt(ownedAccount.accountInfo.lamports ?? 0),
      owner: ownedAccount.publicKey,
      lamports: BigInt(ownedAccount.accountInfo.lamports ?? 0),
      token: {
        mintAddress: "Asdfasdf",
        decimals: 9,
        name: "",
        symbol: "SOL",
      },
    }
  }
  return undefined
}
