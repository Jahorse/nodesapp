# Launch Blockers
1. Move the fetching of nodes from contracts into the top level similar to the provider configuration.
1. Move nodes into `Contract` so they are encapsulated and don't need to be passed around.
1. Introduce the profile concepts.
  - Attached to a wallet address or the connected wallet
  - Can control which node projects load on it.
1. Add ability to enable and disable node projects.
1. The claim and compound buttons should only enable if the wallet address that is claimable is the address of the connected wallet.
  * This requires special treatment of the connected wallet address and the nodes that are attached to it. Should there be a separate table for the connected wallet?
1. Add a column to the table for USD price.

# TODO List
1. Figure out how to monitor transactions to show when they're complete
1. Add detail views for every project that open when you click the row.
1. Request form for adding nodes https://docs.google.com/forms/d/e/1FAIpQLSe0tIojm2WPAT_i3lkiv5OVMJRyEC14hm5merqH2NrnaPWUOQ/viewform

# Ideas
1. Should Pentagon tiers be split out? This would be nice visually, but the claim feature would be difficult to use. Maybe only split them out in a detail view.
1. Detail page should have info about:
  - Tokenomics
  - Maybe a price chart?
    - Ape board links out to price chart.
  -
1. Add token to wallet button (apeboard has this)

# Profiles

* A user can have multiple profiles
* A connected wallet is its own profile.
* A profile has a list of wallet addresses.
* Adding a wallet address allows chains to be selected. To start all can be selected or deselected. We'll add intelligent detection based on format later.
