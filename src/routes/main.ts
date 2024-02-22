import express from "express";
import roleRoute from "./role-route"
import userRoute from "./user-route"
import menuRoute from "./menu-route"
import submenuRoute from "./submenu-route"
import accessRoute from "./rolemenuaccess-route"

const app = express();

app.use("/role", roleRoute)
app.use("/user", userRoute)
app.use("/menu", menuRoute)
app.use("/submenu", submenuRoute)
app.use("/access", accessRoute)

export default app