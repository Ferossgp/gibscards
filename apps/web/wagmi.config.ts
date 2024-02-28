import { defineConfig } from '@wagmi/cli'
import { actions, hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'app/abis.ts',
  contracts: [],
  plugins: [
    actions(),
    hardhat({
      project: '../contracts',
      deployments: {},
    }),
  ],
})