
import React from 'react';
import { Card } from 'primereact/card'; 

export default function Profile() {

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    


    return (
        <div className=" flex-column md:flex-row justify-content-center mt-8">
            <Card title="Vincentius Ardi Christanto" subTitle="Junior BackEnd Engineer" header={header} className="md:w-auto md:m-4 justify-content-center"></Card>
        </div>
    )
}
