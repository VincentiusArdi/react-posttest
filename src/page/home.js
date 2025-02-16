import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import img from "../assets/image/1668046008714.jpg";
import images from "../assets/image/SPONSOR-UPDATE.png"

export default function Home() {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card border-round mt-8 flex justify-center w-full max-w-4xl mx-auto shadow-lg bg-white">
            <div className="grid w-full">
                <div className="col-12 justify-center p-4">
                    <div
                        className="relative w-full h-20rem border-round overflow-hidden shadow-5"
                        style={{
                            backgroundImage: `url(${img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        {/* Overlay untuk efek gelap di atas gambar */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay hitam transparan
                            }}
                        ></div>

                        {/* Teks di atas overlay */}

                        <div
                            className="flex flex-column relative text-white text-xl md:text-2xl font-bold z-10 md:m-4 fadein animation-duration-1000"
                            style={{ alignItems:"center" }}
                        >
                            <img src={images} alt="Logo" width="200"/>
                            <p className="text-xl font-bold mb-1">Hi, OGYA !!!</p>
                            <p className="text-lg font-semibold mb-1">Welcome To SIMPENIN</p>
                            <p className="text-base mb-1">Sistem Pendataan Inventaris</p>
                        </div>
                    </div>
                </div>

                <div className="col-6 card flex flex-column justify-center p-4">
                    <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                </div>
            </div>
        </div>
    );
}
