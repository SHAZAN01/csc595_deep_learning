import './App.css'

function App() {

  return (
    <>
      <header>
        <h1>Student Services</h1>
      </header>
      <main>
        <section id="login" className="login">
          <h2>Login</h2>
          <form>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <button type="submit">Login</button>
          </form>
        </section>
        <section id="profile" className="profile">
          <h2>Profile</h2>
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
        </section>
        <section id="calendar" className="calendar">
          <h2>Availability Calendar</h2>
          <p>Monday: 9am - 5pm</p>
          <p>Tuesday: 9am - 5pm</p>
          <p>Wednesday: 9am - 5pm</p>
          <p>Thursday: 9am - 5pm</p>
          <p>Friday: 9am - 5pm</p>
        </section>
      </main>
    </>
  )
}

export default App
