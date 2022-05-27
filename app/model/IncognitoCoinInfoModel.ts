class IncognitoCoinInfo {
  id: any;
  tokenID: any;
  createdAt: any;
  updatedAt: any;
  deletedAt: any;
  image: any;
  isPrivacy: any;
  name: any;
  symbol: any;
  userID: any;
  ownerAddress: any;
  description: any;
  showOwnerAddress: any;
  isOwner: any;
  ownerEmail: any;
  ownerWebsite: any;
  verified: any;
  totalSupply: any;
  amount: any;
  ownerName: any;

  constructor(data: any = {}) {
    this.id = data?.TokenID;
    this.tokenID = data?.TokenID;
    this.createdAt = data?.CreatedAt;
    this.updatedAt = data?.UpdatedAt;
    this.deletedAt = data?.DeletedAt;
    this.image = data?.Image;
    this.isPrivacy = data?.IsPrivacy;
    this.name = data?.Name;
    this.symbol = data?.Symbol;
    this.userID = data?.UserID;
    this.ownerAddress = data?.OwnerAddress;
    this.description = data?.Description;
    this.showOwnerAddress = Boolean(data?.ShowOwnerAddress);
    this.isOwner = data?.IsOwner;
    this.ownerName = data?.OwnerName;
    this.ownerEmail = data?.OwnerEmail;
    this.ownerWebsite = data?.OwnerWebsite;
    this.totalSupply = data?.Amount;
    this.verified = data?.Verified || false;
    this.amount = 0;
  }
}

export default IncognitoCoinInfo;
