import React, { useContext, useMemo } from "react"
import { useBackground } from "./background"
import { ProgramPluginManager } from "@/core/program-plugin"
import { useConnection } from "./connection"

interface ProgramPluginsContextType {
  programPluginManager: ProgramPluginManager | undefined
}

const ProgramPluginsContext = React.createContext<ProgramPluginsContextType>(null!)

export function ProgramPluginsManagerProvider(props: React.PropsWithChildren<{}>) {
  const { connection } = useConnection()

  const programPluginManager = useMemo<ProgramPluginManager | undefined>(() => {
    return new ProgramPluginManager({
      getConnection: () => {
        return connection
      },
    })
  }, [])

  return (
    <ProgramPluginsContext.Provider value={{ programPluginManager }}>
      {props.children}
    </ProgramPluginsContext.Provider>
  )
}

export const useProgramPluginManager = (): ProgramPluginManager | undefined => {
  const context = useContext(ProgramPluginsContext)
  if (!context) {
    throw new Error(
      "Program plugins manager not found, useProgramPlugins must be used within the <ProgramPluginsManagerProvider>..</ProgramPluginsManagerProvider>"
    )
  }

  return context.programPluginManager
}
