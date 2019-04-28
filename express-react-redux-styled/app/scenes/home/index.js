// libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components'

// Theme
import theme from 'services/theme'

const SectionContainer = styled.section`
  /* Color the border and text with theme.main */
  background-color: ${props => props.theme.fgLight};
  color: ${props => props.theme.bg};
  text-align: center;
`;


class Home extends Component {
  render() {
    const {
      home: {
        content
      }
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <SectionContainer id="main" className="col-9">
          {
            content
          }
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

export default connect(mapStateToProps)(Home);
