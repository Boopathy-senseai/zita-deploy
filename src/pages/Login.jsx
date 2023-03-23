import axios from 'axios';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      IsLogin: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handelLogin = this.handelLogin.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handelLogin = (e) => {
    e.preventDefault();
    e.target.getElementsByClassName('BtnLoader')[0].innerHTML =
      '<div className="spinner-grow spinner-grow-sm mr-2"></div>';

    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post('auth/login', data, config)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        this.setState({
          message: 'You Successfully LoggedIn',
          class: 'success',
          IsLogin: true,
        });
        this.props.setUser(res.data.user);
        e.target.getElementsByClassName('BtnLoader')[0].innerHTML = '';
      })
      .catch((err) => {
        e.target.getElementsByClassName('BtnLoader')[0].innerHTML = '';
        if (err.response) {
          if (err.response.status !== 200) {
            localStorage.clear();
            this.setState({
              message: err.response.data.non_field_errors[0],
              class: 'danger',
              IsLogin: false,
            });
          }
        } else {
          this.setState({
            message: 'Server Error ! Not Connected',
            class: 'danger',
            IsLogin: false,
          });
        }
      });
  };

  render() {
    let displayMessage = '';

    if (this.state.message) {
      const cls = 'alert mb-4 py-3 mt-3 alert-' + this.state.class;
      displayMessage = <div className={cls}>{this.state.message}</div>;
    }
    if (this.state.IsLogin) {
      return <Redirect to={'/'} />;
    }
    return (
      <>
        <section className="section-padding">
          <div className="container">
            <div className="row align-items-center justify-content-center full-height">
              <div className="col-lg-4 col-md-5 col-12">
                <div className="text-center">
                  <img className="loginLogo" src={Logo} alt="Logo" />
                  <div className="small mb-3 text-muted">
                    Enter your credentials to login
                  </div>
                </div>
                <div className="rounded-lg bg-light rounded px-4">
                  <p className="pt-4 mb-0 font-weight-bold">
                    Login to your account
                  </p>
                  {displayMessage}
                  <form
                    onSubmit={this.handelLogin}
                    className="form pb-4 pt-4"
                    action="#"
                    method="POST"
                  >
                    <div className="form-group mb-4 pb-2">
                      <input
                        type="text"
                        required
                        value={this.state.username}
                        name="username"
                        onChange={this.onChange}
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Username</label>
                    </div>
                    <div className="form-group mb-4 pb-2">
                      <input
                        type="password"
                        required
                        value={this.state.password}
                        name="password"
                        onChange={this.onChange}
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Password</label>
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-round btn-medium w-100"
                        type="submit"
                      >
                        <span className="BtnLoader"></span>
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
