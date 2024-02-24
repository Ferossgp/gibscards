import { defineConfig } from '@wagmi/cli'
import { actions, hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'app/abis.ts',
  contracts: [],
  plugins: [
    actions(),
    hardhat({
      project: '../hardhat',
      deployments: {
        Message: {
          11155111: '0xcc5a0d6268d70811edad77799f2168afe6382e89',
        },
      },
    }),
  ],
})