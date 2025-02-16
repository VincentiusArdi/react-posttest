import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import Swal from 'sweetalert2';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import storeInventaris from '../component/zustand/store';




function Inventaris() {

    const { formInput, updatedForm } = storeInventaris();
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState(null);
    const [kondisi] = useState("");
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);
    const formattedDate = `${day}${month}${year}`;
   

    const inputForm = {
        idInventaris: '',
        tanggalInput: '',
        jenisInventaris: '',
        merk: '',
        typeMerk: '',
        kondisi: '',
        pic: '',
        projek: ''
    };

    const [dataForm, setDataForm] = useState(inputForm);

    const items = [
        'Laptop',
        'Server',
        'UPS',
        'AccessPoint'
    ];

    const project = [
        'BKKBN',
        'SAKTI',
        'AIA',
        'MANDIRI',
        'BackOffice'
    ];

    addLocale("id", {
        firstDayOfWeek: 1,
        dayNames: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
        dayNamesShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
        dayNamesMin: ["Mi", "Se", "Se", "Ra", "Ka", "Ju", "Sa"],
        monthNames: [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ],
        monthNamesShort: [
            "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
            "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
        ],
        today: "Hari Ini",
        clear: "Bersihkan"
    });

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-sm p-button-info"
                    onClick={() => hadleEdit(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-sm p-button-danger"
                    onClick={() => handleDelete(rowData)}
                />
            </div>
        );
    };

    const handleSubmit = () => {

        let payload = dataForm;

        // console.log(payload)
        if (payload.idInventaris === "") {
            payload.idInventaris = `OGY.${formattedDate}.${uuidv4()}`;

            const newData = formInput.concat(payload);
            updatedForm(newData);

            Swal.fire("Berhasil!", "Data berhasil disimpan.", "success")

            setVisible(false);
        } else {
            const newData = formInput.map((item) =>
                item.idInventaris === payload.idInventaris ? payload : item
            );

            updatedForm(newData);

            Swal.fire("Berhasil!", "Data berhasil disimpan.", "success")

            setVisible(false);
        }

        setDataForm(inputForm)

    }

    const hadleEdit = (rowData) => {
        console.log(rowData);
        setDate(new Date(rowData.tanggalInput))
        setVisible(true);
        setDataForm(rowData);

    }

    const handleDelete = (rowData) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete!",
            reverseButtons: true,
        }
        ).then((result) => {
            if (result.isConfirmed) {
                const filteredData = formInput.filter((item) => item.idInventaris !== rowData.idInventaris);
                updatedForm(filteredData);
                Swal.fire("Berhasil", "Data telah dihapus!", "success");
            }
        });
    };

    const headerTemplate = () => {
        return (
            <div className="flex justify-content-between align-items-center w-full">
                <span className="text-lg font-bold">Daftar Inventaris</span>
                <Button label="Tambah" icon="pi pi-plus" className="p-button-sm p-button-primary" onClick={() => setVisible(true)} />
            </div>
        );
    };

    return (

        <div>
            {/* PANEL TABEL DAFTAR INVENTARIS */}
            <Panel header="Daftar Inventaris" headerTemplate={headerTemplate} className="md:mt-8">
                <DataTable value={formInput} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column field="tanggalInput" header="Tanggal Input" />
                    <Column field="jenisInventaris" header="Jenis Inventaris" />
                    <Column field="merk" header="Merk" />
                    <Column field="typeMerk" header="Type Merk" />
                    <Column field="kondisi" header="Kondisi" />
                    <Column field="pic" header="PIC" />
                    <Column field="projek" header="Projek" />
                    <Column header="Action" body={actionBodyTemplate} />
                </DataTable>
            </Panel>

            {/* DIALOG FORM INPUT INVENTARIS */}
            <Dialog
                visible={visible}
                modal
                onHide={() => { if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="p-4 align-items-center m-8"
                        style={{
                            borderRadius: '12px',
                            backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))'
                        }}
                    >
                        {/* Grid utama dengan 2 kolom per baris */}
                        <div className="grid px-5 py-5">

                            <div className="lg:col-6 sm:col-3">
                                <label className="font-semibold text-primary-50 block mb-2">
                                    Tanggal Input Form
                                </label>
                                <Calendar
                                    value={date}
                                    onChange={(e) => {
                                        if (e.value) {
                                            const selectedDate = new Date(e.value);
                                            const formattedDate = selectedDate
                                                .toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit" })
                                                .replace(/\./g, "/"); // Mengubah titik menjadi garis miring
                                            setDataForm({ ...dataForm, tanggalInput: formattedDate });
                                        }
                                    }}
                                    locale="id" showIcon className="w-full" />
                            </div>

                            <div className="lg:col-6 sm:col-3">
                                <label className="text-primary-50 font-semibold">
                                    Jenis Inventaris
                                </label>
                                <Dropdown
                                    value={dataForm.jenisInventaris}
                                    onChange={(e) => setDataForm({ ...dataForm, jenisInventaris: e.value })} options={items}
                                    placeholder="Select Item" className="w-full bg-white-alpha-20 border-none text-primary-50" />
                            </div>

                            <div className="lg:col-6 sm:col-3">
                                <label className="text-primary-50 font-semibold">
                                    Merk
                                </label>
                                <InputText
                                    id="merk"
                                    value={dataForm.merk}
                                    onChange={(e) => setDataForm({ ...dataForm, merk: e.target.value })}
                                    className="w-full bg-white-alpha-20 border-none p-3 text-primary-50" />
                            </div>

                            <div className="lg:col-6 sm:col-3">
                                <label className="text-primary-50 font-semibold">
                                    Type Merk
                                </label>
                                <InputText
                                    id="typeMerk"
                                    value={dataForm.typeMerk}
                                    onChange={(e) => setDataForm({ ...dataForm, typeMerk: e.target.value })}
                                    className="w-full bg-white-alpha-20 border-none p-3 text-primary-50" />
                            </div>

                            <div className="lg:col-6 sm:col-3">
                                <label className="text-primary-50 font-semibold">
                                    Projek
                                </label>
                                <Dropdown
                                    value={dataForm.projek}
                                    onChange={(e) => setDataForm({ ...dataForm, projek: e.value })} options={project} optionLabel="name"
                                    placeholder="Select a Item" className="w-full bg-white-alpha-20 border-none text-primary-50" />
                            </div>

                            <div className="lg:col-6 sm:col-3">
                                <label className="text-primary-50 font-semibold">
                                    PIC
                                </label>
                                <InputText
                                    id="pic"
                                    value={dataForm.pic}
                                    onChange={(e) => setDataForm({ ...dataForm, pic: e.target.value })}
                                    className="w-full bg-white-alpha-20 border-none p-3 text-primary-50" />
                            </div>
                            <div className="lg:col-6 sm:col-3">
                                <label className="text-primary-50 font-semibold">
                                    Kondisi
                                </label>
                                <div className="flex gap-3 align-items-center">
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="kondisi1" name="kondisi" value="Baik"
                                            onChange={(e) => setDataForm({ ...dataForm, kondisi: e.value })} checked={kondisi === "Baik"}
                                            className={dataForm.kondisi === "Baik" ? "custom-radio-green" : ""}
                                        />
                                        <label htmlFor="kondisi1" className="ml-2 text-primary-50">Baik</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="kondisi2" name="kondisi" value="Rusak"
                                            onChange={(e) => setDataForm({ ...dataForm, kondisi: e.value })} checked={kondisi === "Rusak"}
                                            className={dataForm.kondisi === "Rusak" ? "custom-radio-red" : ""}
                                        />
                                        <label htmlFor="kondisi2" className="ml-2 text-primary-50">Rusak</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-content-center gap-3 mt-4">
                            <Button label="Submit" onClick={handleSubmit} text
                                className="p-3 text-primary-50 border-1 border-white hover:bg-green-500"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text
                                className="p-3 text-primary-50 border-1 border-white hover:bg-red-500"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}

export default Inventaris