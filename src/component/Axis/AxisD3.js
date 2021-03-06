import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { select, axisBottom } from 'd3';
import reactHtmlParser from 'react-html-parser';

class AxisD3 extends Component {
  componentWillMount() {
    const { renderASAP, translateX, translateY } = this.props;
    if (renderASAP) {
      const g = document.createElement('g');
      g.setAttribute('transform', `translate(${translateX}, ${translateY})`);
      this.setRef(g);
      this.renderAxis();
    }
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  setRef = axis => {
    this.axis = axis;
  };

  renderAxis() {
    const { d3Axis, scale } = this.props;

    select(this.axis).call(d3Axis.scale(scale));
  }

  render() {
    this.renderAxis();
    const { translateX, translateY, renderASAP } = this.props;
    if (renderASAP) {
      const [axis] = reactHtmlParser(this.axis.outerHTML);
      return axis;
    }
    return (
      <g
        ref={this.setRef}
        transform={`translate(${translateX}, ${translateY})`}
      />
    );
  }
}

AxisD3.propTypes = {
  scale: PropTypes.func.isRequired,
  d3Axis: PropTypes.func,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
};

AxisD3.defaultProps = {
  d3Axis: axisBottom(),
  translateX: 0,
  translateY: 0,
};

export default AxisD3;
