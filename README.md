This was a project I made that integrates a bunch of crypto "node" projects into a single dashboard where a user could enter their wallet address, 
or connect through Metamask, and see how much outstanding rewards they have. If a wallet is connected, a lot of the protocols had their claim and/or 
compound features integrated too.

This was mostly just for a learning experience and challenge to reverse engineer how each protocol's dApp interacted with the protocol's smart contracts. 
Unfortunately it became a lot of work to keep up with all the new protocols that were launching as well as the updates being made to the already supported 
protocols, so I shut it down. The fact that a lot of the people running these protocols didn't support my work of integrating them into this app definitely 
didn't help things either.

1. To get an idea of the projects that were supported, check out the [Protocols page](src/App/ProtocolsRoute.js)
2. To see how the contract integration worked, check out the [ContractsApi folder](src/App/ContractsApi). 
3. You should still be able to deploy it locally running `npm i` and `npm start`, although the dependencies are very out of date.
4. It lives on in the Wayback Machine: https://web.archive.org/web/20220524135013/https://www.nodesapp.info
