class Asset {
  constructor(props: Object) {
    Object.assign(this, props);
  }

  getFormattedDetails() {
    return {
      src: this.file.url,
      width: this.file.details.image.width,
      height: this.file.details.image.height,
      alt: this.title,
      title: this.title,
    };
  }
}

export default Asset;