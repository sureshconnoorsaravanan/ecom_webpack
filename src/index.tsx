import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/theme/themeContext';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';

const Container = styled.div<{ theme: any }>`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const RootComponent = () => {
  const { theme } = useTheme(); // use the theme inside a component

  return (
    <StyledThemeProvider theme={theme}>
      <Container theme={theme}>
        <App />
      </Container>
    </StyledThemeProvider>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <CustomThemeProvider>
      <RootComponent />
    </CustomThemeProvider>
  );
}
