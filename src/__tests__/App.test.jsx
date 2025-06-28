import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders StartMatchForm, MatchesSummary, and ActiveMatches', () => {
    render(<App />);
    expect(screen.getByText('Start Match')).toBeInTheDocument();
    expect(screen.getByText('Summary (Ordered by Total Score)')).toBeInTheDocument();
    expect(screen.getByText(/Active Matches/i)).toBeInTheDocument();
  });

  it('shows error alert if trying to start match with same teams', async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Home team'), { target: { value: 'Team A' } });
    fireEvent.change(screen.getByPlaceholderText('Away team'), { target: { value: 'Team A' } });
    fireEvent.click(screen.getByRole('button', { name: /start match/i }));

    await waitFor(() => {
      expect(screen.getByText(/Home and away teams must be different/i)).toBeInTheDocument();
    });
  });

  it('starts a match and displays success alert', async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Home team'), { target: { value: 'Team A' } });
    fireEvent.change(screen.getByPlaceholderText('Away team'), { target: { value: 'Team B' } });
    fireEvent.click(screen.getByRole('button', { name: /start match/i }));

    await waitFor(() => {
      expect(screen.getByText('Match started: Team A vs Team B')).toBeInTheDocument();
    });
  });
});
