import { Redirect, Route } from "react-router-dom";

const AuthRoute = ( {isLogined, component: Component, render, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={(props) =>
        isLogined? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}} 
          />
        )}
      />
  );
}

export default AuthRoute;