export class Node {
    name;
    creationTime;
    lastProcessingTime;
    nextProcessingTime;
    amount;
    rewards;

    constructor(props) {
        if (props === undefined) { props = {}; }

        this.name = props.name;
        this.creationTime = props.creationTime;
        this.lastProcessingTime = props.lastProcessingTime;
        this.nextProcessingTime = props.nextProcessingTime;
        this.amount = props.amount;
        this.rewards = props.rewards;
    }

    isClaimable() {
        if (this.nextProcessingTime && this.nextProcessingTime > Date.now()) {
            return true;
        }
        return false;
    }
}