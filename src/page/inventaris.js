import React, { useState } from 'react'
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




function Inventaris() {

    const [inventaris, setInventaris] = useState([]);
    const [visible, setVisible] = useState(false);
    const [barang, setBarang] = useState(null);
    const [date, setDate] = useState(null);
    const [kondisi, setKondisi] = useState("");
    const columns = [
        { field: 'inventarisId', header: 'Inventaris ID' },
        { field: 'jenisInventaris', header: 'Jenis Inventaris' },
        { field: 'merk', header: 'Merk' },
        { field: 'typeMerk', header: 'Type Merk' },
        { field: 'kondisi', header: 'Kondisi' },
        { field: 'pic', header: 'PIC' },
        { field: 'projek', header: 'Projek' },
        { field: 'hariTanggal', header: 'Hari/Tanggal' },
    ];

    const items = [
        { name: 'Laptop' },
        { name: 'Server' },
        { name: 'UPS' },
        { name: 'AccessPoint' },
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
                <DataTable value={inventaris}>
                    {columns.map((col, i) => (
                        <Column key={col.field} field={col.field} header={col.header} />
                    ))}
                </DataTable>
            </Panel>

            {/* DIALOG FORM INPUT INVENTARIS */}
            <Dialog
                visible={visible}
                modal
                onHide={() => { if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="grid allign-items-center p-3 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="grid">
                            <div className="col-6 ">
                                <label htmlFor="buttondisplay" className="font-semibold text-primary-50 block mb-2">
                                    Tanggal Input Form
                                </label>
                                <Calendar value={date} onChange={(e) => setDate(e.value)} locale="id" showIcon />
                            </div>

                            <div className="col-6 ">
                                <label className="text-primary-50 font-semibold">
                                    Jenis Inventaris
                                </label>
                                <Dropdown value={barang} onChange={(e) => setBarang(e.value)} options={items} optionLabel="name"
                                    placeholder="Select a Item" className="w-full md:w-14rem bg-white-alpha-20 border-none text-primary-50" />
                            </div>

                            <div className="col-6">
                                <label className="text-primary-50 font-semibold">
                                    Merk
                                </label>
                                <InputText id="merk" label="Merk" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>
                            <div className="col-6 ">
                                <label className="text-primary-50 font-semibold">
                                    Type Merk
                                </label>
                                <InputText id="merk" label="TypeMerk" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>

                            <div className="col-6 ">
                                <label className="text-primary-50 font-semibold">
                                    Kondisi
                                </label>
                                <div className="formgroup-inline gap-2">
                                    <div className="flex align-items-center">
                                        <RadioButton
                                            inputId="kondisi1"
                                            name="kondisi"
                                            value="Baik"
                                            onChange={(e) => setKondisi(e.value)}
                                            checked={kondisi === "Baik"}
                                            className={kondisi === "Baik" ? "custom-radio-green" : ""}
                                        />
                                        <label htmlFor="kondisi1" className="ml-2">Baik</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton
                                            inputId="kondisi2"
                                            name="kondisi"
                                            value="Rusak"
                                            onChange={(e) => setKondisi(e.value)}
                                            checked={kondisi === "Rusak"}
                                            className={kondisi === "Rusak" ? "custom-radio-red" : ""}
                                        />
                                        <label htmlFor="kondisi2" className="ml-2">Rusak</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <label className="text-primary-50 font-semibold">
                                    PIC
                                </label>
                                <InputText id="pic" label="PIC" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>

                        </div>
                        <div className="formgroup-inline gap-2">
                            <div className="flex align-items-center">
                                <Button label="Sign-In" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>
                            <div className="flex align-items-center">
                                <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}

export default Inventaris