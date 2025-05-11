import './auth-login.css';

type Props = {
  clientId: string;
  onClientIdChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function AuthLogin({ clientId, onClientIdChange, onSubmit }: Props) {
  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="clientId">Client ID:</label>
          <input
            id="clientId"
            value={clientId}
            onChange={(e) => onClientIdChange(e.target.value)}
            placeholder="Fill in your client id"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="No need to fill it"
            onChange={(e) => onClientIdChange(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
