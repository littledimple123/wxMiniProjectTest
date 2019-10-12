Page({
  data: {
    lists: [
      {
        title: '标题一',
        content: '内容111111111'
      },
      {
        title: '标题二',
        content: '内容222222222'
      }
    ],
    selectedFlag: []
  },
  onLoad() {
    for (let i = 0; i < this.data.lists.length; i++) {
      this.data.selectedFlag.push(false);
    }
  },
  toggleList(e) {
    console.log(e.target.id);
    // console.log(this.data.lists.length)
    if (this.data.selectedFlag[e.target.id] === false) {
      this.data.selectedFlag[e.target.id] = true;
    } else if (this.data.selectedFlag[e.target.id] === true) {
      this.data.selectedFlag[e.target.id] = false;
    }
    console.log(this.data.selectedFlag[e.target.id]);
  }
});
