// libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components'

// Theme
import theme from 'services/theme'

// Components
import Card from './components/card'

const SectionContainer = styled.section`
  /* Color the border and text with theme.main */
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.alternativeColor};
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
        <SectionContainer id="main" className="col-10">
          {
            [1,2,3,4,5].map((x, idx) => {
              return (
                <Card header="My Content">
                  {
                    content
                  }
                </Card>
              )
            })
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
