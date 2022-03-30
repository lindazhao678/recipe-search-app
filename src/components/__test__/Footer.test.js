import { render, screen } from '@testing-library/react'; 
import Footer from '../Footer';

test('Renders correct footer', () => {
    render(<Footer />);
    const footerElement = screen.getByText("Recipe Search App", {exact: false});
    expect(footerElement).toBeInTheDocument();
  });
