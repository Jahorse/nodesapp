import { Node } from './Node';

export class UniverseNode extends Node {
    planetId;
    rewardMult;
    totalClaimed;
    rewardPerDay;
    compoundDelay;

    constructor(props) {
      super(props);

      if (props === undefined) { props = {}; }

      this.planetId = props.planetId;
      this.rewardMult = props.rewardMult;
      this.totalClaimed = props.totalClaimed;
      this.rewardPerDay = props.rewardPerDay;
      this.compoundDelay = props.compoundDelay;
    }
}