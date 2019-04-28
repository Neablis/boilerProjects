import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components'

// Theme
import theme from 'services/theme'

const SectionContainer = styled.section`
  /* Color the border and text with theme.main */
  background-color: ${props => props.theme.fg};
  color: ${props => props.theme.bgLight};
  text-align: center;
`;

class Nav extends Component {
  render() {
    const {
      nav: {
        content
      }
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <SectionContainer id="nav" className="col-3">
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
    nav: state.nav
  };
}

export default connect(mapStateToProps)(Nav);
