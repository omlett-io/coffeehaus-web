import React from "react";

function PortalPage() {
    return (
        <div>
            <p>This is a Keycloak-secured component of your application. You shouldn't be able
                to see this unless you've authenticated with Keycloak.</p>
        </div>
    )
}

export default PortalPage;