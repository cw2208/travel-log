import React from "react";
import { SubmitButton } from "./journal/Button"

export function CompleteSubmit() {

    return (
        <div>
            <header>
                <h1 className="complete-sub-heading">Your log has been created!</h1>
            </header>

            <main className="button-box">
                <SubmitButton />
            </main>

            
        </div>

    )
}