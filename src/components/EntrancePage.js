import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { variables } from './Variables';
import { useNavigate } from 'react-router-dom';

export default function EntrancePage({ parentState }) {
  const [isSignUpButtonClicked, setIsSignUpButtonClicked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [state, setState] = useState({
    UserName: "",
    Password: "",
    Email: ""
  })

  const navigate = useNavigate();

  useEffect(() => {
    parentState({ userName: "" })
    // localStorage.clear(); 
    // if(sessionStorage.length == 0)
    //   window.location.reload()
    // console.log("ali")
  }, [])

  function createClick() {
    // console.log(state.UserName)
    // console.log(state.Password)
    // console.log(state.Email)
    if (state.UserName.trim() !== "" && state.Password.trim() !== "" && state.Email.trim() !== "") {
      fetch(variables.API_URL + 'add-user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserName: state.UserName,
          Password: state.Password,
          Email: state.Email
        })
      })
        .then(res => res.json())
        .then((result) => {
          alert(result);
          signInClick()
          // parentState({ userName: state.UserName })
          // navigate("/react/dashboard")
        }, (error) => {
          alert('Failed' + error);
        })
      // parentState({ userName: state.UserName })
    }

  }

  function signInClick() {
    // console.log(state.UserName)
    // console.log(state.Password)
    // console.log(state.Email)
    if (state.UserName.trim() !== "" && state.Password.trim() !== "") {
      fetch(variables.API_URL + 'auth-users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserName: state.UserName,
          Password: state.Password
        })
      })
        .then(res => {
          // alert(res.status)
          if (res.status == 200) {
            return res.json()
          } else {
            setIsAuth(false)
            alert("authentication failed")
          }
        })
        .then((result) => {
          // console.log(`state user name: ${state.UserName}`);
          // console.log(`state pass: ${state.Password}`);
          // alert(`returned id: ${result}`);
          parentState({ userName: state.UserName, userId: result })
          
          navigate("/react/dashboard", { replace: true })

        }, (error) => {
          alert('Failed' + error);
        })

    }

  }

  const changeUserName = (e) => {
    setState({ ...state, UserName: e.target.value });
  }
  const changePassword = (e) => {
    setState({ ...state, Password: e.target.value });
  }
  const changeEmail = (e) => {
    setState({ ...state, Email: e.target.value });
  }

  return (
    <>
      <div className='bg-dark d-flex w-100 vh-100 py-5'>
        <div className='container w-50 rounded text-bg-primary my-auto py-4 align-self-center align-items-center d-flex flex-column justify-content-center'>
          <div className='d-flex justify-content-center align-items-center'>
            <button className="btn text-bg-info m-3" onClick={() => setIsSignUpButtonClicked(true)} >Sign-Up</button>
            <button className="btn text-primary-emphasis bg-primary-subtle " onClick={() => setIsSignUpButtonClicked(false)} >Sign-In</button>
          </div>
          {/* <div className='d-flex justify-content-center align-items-center'></div> */}
          {/* <form className='d-flex flex-column justify-content-center align-items-center' action="./add-user.php" method="post"> */}

          {isSignUpButtonClicked
            ?
            <form className='w-50 p-4 d-flex flex-column justify-content-center align-items-center'>
              <div className='w-75 d-flex justify-content-between align-items-center my-1'>
                <label className='' htmlFor='username'>Username: </label>
                <input className='my-2 me-4' name="username" id='username' type="text" onChange={changeUserName} />
              </div>
              <div className='w-75 d-flex justify-content-between align-items-center my-1'>
                <label className='' htmlFor='password'>Password: </label>
                <input className='my-2 me-4' name="password" id='password' type="password" onChange={changePassword} />
              </div>
              <div className='w-75 d-flex justify-content-between align-items-center my-1'>
                <label className='' htmlFor='email'>Email: </label>
                <input className='my-2 me-4' name="email" id='email' type="email" onChange={changeEmail} />
              </div>
              <Link to="/react/dashboard"><button className="btn btn-success" onClick={createClick}>Sign-Up</button></Link>
            </form>
            :
            <form className='w-50 p-4 d-flex flex-column justify-content-center align-items-center' >

              <div className='w-75 d-flex justify-content-between align-items-center my-1'>
                <label className='' htmlFor='signInUsername'>Username: </label>
                <input className='my-2 me-4' name="username" id='signInUsername' type="text" onChange={changeUserName} />
              </div>
              <div className='w-75 d-flex justify-content-between align-items-center my-1'>
                <label className='' htmlFor='signInPassword'>Password: </label>
                <input className='my-2 me-4' name="password" id='signInPassword' type="password" onChange={changePassword} />
              </div>
              <Link to="/react/dashboard">
                <button className="btn btn-success" onClick={signInClick}>Sign-In</button>
              </Link>
              {/* <button className="btn btn-success" onClick={signInClick}>Sign-In</button> */}
              {/* <button className="btn btn-success" onClick={go}>GO with assign and navigate</button> */}
              {/* <Link to="/react/dashboard"><button className="btn btn-success">GO with Link</button></Link>
              <Link to="/react/dashboard"><button className="btn btn-success" onClick={() => { parentState({ UserName: "hasan" }) }}>GO with Link and set</button></Link> */}
            </form>
          }
        </div>
      </div>
    </>
  )
}
