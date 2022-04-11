# Nice Storage

Nice storage is a contract that allows a value to be stored in a decentralized manner through a governance
mechanism.

## Quick start

```shell
npm install
```

before running scripts, you can configure the setup by editing `scripts/config.ts`

```typescript
export const MIN_DELAY = 1; // in blocks
export const VOTING_DELAY = 1;
export const QUORUM_AMOUNT = 0;
export const VOTING_PERIOD = 1;
```

to deploy and setup a nice storage instance run the following

```shell
$ npx hardhat run scripts/deploy/setup.ts
Token deployed at  0x5FbDB2315678afecb367f032d93F642f64180aa3
Nice Time Lock deployed at  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Nice Governor deployed at  0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
Nice Storage deployed at  0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
Transfer ownership to NiceTimeLock
Ownership transferred
```

there are 4 deploy stages which the above scripts automatically goes through.

you can also manually go through each stage by running each of the scripts under `scripts/deploy` directory

- `00_deployNiceToken` deploys the governance token
- `01_deployNiceTimeLock` deploys the time lock that will be the owner of the nice storage
- `02_deployNiceGovernor` deploys the governance contract
- `03_deployNiceStorage` deploys the nice storage contract and transfers ownership to time lock
