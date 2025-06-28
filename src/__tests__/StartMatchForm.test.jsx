import { render, screen, fireEvent } from '@testing-library/react';
import { StartMatchForm } from '../components/StartMatchForm';

describe('StartMatchForm UI', () => {
  test('renders inputs and button', () => {
    render(<StartMatchForm onStartMatch={() => {}} />);
    
    expect(screen.getByPlaceholderText(/home team/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/away team/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start match/i })).toBeInTheDocument();
  });

  test('disables button if inputs are empty', () => {
    render(<StartMatchForm onStartMatch={() => {}} />);
    
    const button = screen.getByRole('button', { name: /start match/i });
    expect(button).toBeDisabled();
  });

  test('calls onStartMatch with correct data and clears inputs', () => {
    const mockFn = jest.fn();
    render(<StartMatchForm onStartMatch={mockFn} />);
    
    const homeInput = screen.getByPlaceholderText(/home team/i);
    const awayInput = screen.getByPlaceholderText(/away team/i);
    const button = screen.getByRole('button', { name: /start match/i });

    fireEvent.change(homeInput, { target: { value: 'Team A' } });
    fireEvent.change(awayInput, { target: { value: 'Team B' } });

    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalledWith('Team A', 'Team B');
    expect(homeInput).toHaveValue('');
    expect(awayInput).toHaveValue('');
  });

  test('does not call onStartMatch when inputs are empty or the same', () => {
    const mockFn = jest.fn();
    render(<StartMatchForm onStartMatch={mockFn} />);
    
    const homeInput = screen.getByPlaceholderText(/home team/i);
    const awayInput = screen.getByPlaceholderText(/away team/i);
    const button = screen.getByRole('button', { name: /start match/i });

    fireEvent.click(button);
    expect(mockFn).not.toHaveBeenCalled();

    fireEvent.change(homeInput, { target: { value: 'Team X' } });
    fireEvent.change(awayInput, { target: { value: 'Team X' } });
    fireEvent.click(button);

    expect(mockFn).not.toHaveBeenCalled();
  });
});
