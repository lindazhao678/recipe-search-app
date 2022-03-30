import { render, screen } from '@testing-library/react'; 
import Contact from '../Contact';

test('Renders name field', () => {
    render(<Contact  />);
    const nameElement = screen.getByPlaceholderText(/name/); 
    expect(nameElement).toBeInTheDocument(); 
    const nameLabel = screen.getByText(/NAME/); 
    expect(nameLabel).toBeInTheDocument(); 
  });

  test('Renders email field', () => {
    render(<Contact  />);
    const emailElement = screen.getByPlaceholderText(/email/); 
    expect(emailElement).toBeInTheDocument(); 
    const nameLabel = screen.getByText(/EMAIL/); 
    expect(nameLabel).toBeInTheDocument(); 
  });

  test('Renders feedback field', () => {
    render(<Contact  />);
    const feedbackElement = screen.getByPlaceholderText(/feedback/); 
    expect(feedbackElement).toBeInTheDocument(); 
    const nameLabel = screen.getByText(/FEEDBACK/); 
    expect(nameLabel).toBeInTheDocument(); 
  });
