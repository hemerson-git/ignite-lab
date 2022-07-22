import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../pages/SingIn";

export function Routes() {
  return (
    // <NavigationContainer>
    //   <AppRoutes />
    //   {/* <AppRoutes /> */}
    // </NavigationContainer>

    <SignIn />
  );
}
