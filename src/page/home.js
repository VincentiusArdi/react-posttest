import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import img from "../assets/image/1668046008714.jpg";
import images from "../assets/image/SPONSOR-UPDATE.png"
import storeInventaris from "../component/zustand/store";

export default function Home() {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { formInput } = storeInventaris();
    const [chartBarData, setChartBarData] = useState({});
    const [chartBarOptions, setChartBarOptions] = useState({});

    const countLaptop = formInput.filter((item) => item.jenisInventaris === "Laptop").length;
    const countServer = formInput.filter((item) => item.jenisInventaris === "Server").length;
    const countUps = formInput.filter((item) => item.jenisInventaris === "UPS").length;
    const countAccessPoint = formInput.filter((item) => item.jenisInventaris === "AccessPoint").length;
    const countLaptopBaik = formInput.filter((item) => item.jenisInventaris === "Laptop" && item.kondisi === "Baik").length;
    const countServerBaik = formInput.filter((item) => item.jenisInventaris === "Server" && item.kondisi === "Baik").length;
    const countUpsBaik = formInput.filter((item) => item.jenisInventaris === "UPS" && item.kondisi === "Baik").length;
    const countAccessPointBaik = formInput.filter((item) => item.jenisInventaris === "AccessPoint" && item.kondisi === "Baik").length;
    const countLaptopRusak = formInput.filter((item) => item.jenisInventaris === "Laptop" && item.kondisi === "Rusak").length;
    const countServerRusak = formInput.filter((item) => item.jenisInventaris === "Server" && item.kondisi === "Rusak").length;
    const countUpsRusak = formInput.filter((item) => item.jenisInventaris === "UPS" && item.kondisi === "Rusak").length;
    const countAccessPointRusak = formInput.filter((item) => item.jenisInventaris === "AccessPoint" && item.kondisi === "Rusak").length;


    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Laptop', 'Server', 'UPS', 'AccessPoint'],
            datasets: [
                {
                    data: [countLaptop, countServer, countUps, countAccessPoint],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--indigo-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--indigo-500')
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
    }, [countLaptop, countServer, countUps, countAccessPoint]);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Laptop', 'Server', 'UPS', 'AccessPoint'],
            datasets: [
                {
                    label: 'Baik',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [countLaptopBaik, countServerBaik, countUpsBaik, countAccessPointBaik]
                },
                {
                    label: 'Rusak',
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    data: [countLaptopRusak, countServerRusak, countUpsRusak, countAccessPointRusak]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartBarData(data);
        setChartBarOptions(options);
    }, [countLaptopBaik, countServerBaik, countUpsBaik, countAccessPointBaik, countLaptopRusak, countServerRusak, countUpsRusak, countAccessPointRusak]);

    return (
        <div className="card border-round mt-8 flex justify-center w-full max-w-4xl mx-auto shadow-lg bg-white">
            <div className="grid w-full">
                <div className="xl:col-12 sm:col-6 justify-center p-4 min-w-min">
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
                            style={{ alignItems: "center" }}
                        >
                            <img src={images} alt="Logo" width="200" />
                            <p className="text-xl font-bold mb-1">Hi, OGYA !!!</p>
                            <p className="text-lg font-semibold mb-1">Welcome To SIMPENIN</p>
                            <p className="text-base mb-1">Sistem Pendataan Inventaris</p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-6 sm:col-3 card flex flex-column justify-center p-4 sm:min-w-min">
                    <Chart title="Jumlah Inventaris" type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                </div>
                <div className="xl:col-6 sm:col-3 card flex flex-column justify-center p-4 sm:min-w-min">
                <Chart title="Kondisi Inventaris" type="bar" data={chartBarData} options={chartBarOptions} />
                </div>
            </div>
        </div>
    );
}
