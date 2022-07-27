import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import History from "../pages/history/History"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />

                <Route path="/history" element={<History />} />

            </Routes>
        </BrowserRouter>
    )
}

