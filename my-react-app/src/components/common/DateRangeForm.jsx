export const DateRangeForm = ({ startDate, setStartDate, endDate, setEndDate, onSubmit }) => (
    <form onSubmit={onSubmit} className="date-form">
        <div className="form-group">
            <label>Data początku:</label>
            <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="form-input"
            />
        </div>
        <div className="form-group">
            <label>Data końca:</label>
            <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="form-input"
            />
        </div>
        <button type="submit" className="login-button">
            Zatwierdź
        </button>
    </form>
);
