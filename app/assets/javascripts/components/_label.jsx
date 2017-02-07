class Label extends React.Component {
  render () {
    return (
      <div>
        <div>{this.props.label}</div>
      </div>
    );
  }
}

Label.propTypes = {
  label: React.PropTypes.string
};
