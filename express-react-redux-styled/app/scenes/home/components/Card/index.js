// Libraries
import React, { PureComponent } from 'react';

import styled, { ThemeProvider } from 'styled-components'

// Theme
import theme from 'services/theme'

// Styles
const CardContainer = styled.section`
  /* Color the border and text with theme.main */
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.backgroundColor};
  text-align: center;
  border-radius: 15px;
  min-height: 150px;
  min-width: 100px;
  display: inline-block;
  margin: 20px;
`;

const CardHeader = styled.div`
  background-color: ${props => props.theme.color};
  border-radius: 15px 15px 0 0;
  height: 30px;
  width: 100%;
`;

const CardBody = styled.div`
  margin: 10px;
`;


class Card extends PureComponent {
  render() {
    const {
      header,
      children
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CardContainer>
          {
            header && (
              <CardHeader>{this.props.header}</CardHeader>
            )
          }
          <CardBody>
            {
              children
            }
          </CardBody>
        </CardContainer>
      </ThemeProvider>
    );
  }
}

export default Card
