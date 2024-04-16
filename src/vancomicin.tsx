import React, { useState } from 'react';
import axios from 'axios';
import LineChart from './LineChart';
import {ChartDataType, PharmaKineticResponse} from "./ChartData.type";
import LineChart1 from "./LineChart1";

const ModelEnum = {
    THOMPSON: 'Thompson',
    GOTHI: 'Gothi',
    CARRENO: 'Carreno'
};

const CrclDosing = {
    AJBW: 'AjBW',
    TBW: 'TBW',
    IBW: 'IBW',
    LBW: 'LBW'
};

const Gender = {
    MALE: 'Male',
    FEMALE: 'Female'
};

function MyForm() {
    const [dose, setDose] = useState('1000');
    const [infusionTime, setInfusionTime] = useState('3');
    const [dosingInterval, setDosingInterval] = useState('8');
    const [age, setAge] = useState('32');
    const [tbw, setTbw] = useState('69');
    const [height, setHeight] = useState('160');
    const [numberOfDoses, setNumberOfDoses] = useState('10');
    // const [dose, setDose] = useState('');
    // const [infusionTime, setInfusionTime] = useState('');
    // const [dosingInterval, setDosingInterval] = useState('');
    // const [age, setAge] = useState('');
    // const [tbw, setTbw] = useState('');
    // const [height, setHeight] = useState('');
    // const [numberOfDoses, setNumberOfDoses] = useState('');
    const [trough, setTrough] = useState('');
    const [peak, setPeak] = useState('');
    const [auc_ss, setAuc_ss] = useState('');

    const [selectedGender, setSelectedGender] = useState(Gender.MALE);

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const [selectedCrclDosing, setSelectedCrclDosing] = useState(CrclDosing.AJBW);

    const handleCrclDosingChange = (event) => {
        setSelectedCrclDosing(event.target.value);
    };

    const [selectedModel, setSelectedModel] = useState(ModelEnum.THOMPSON);

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    const [responseData, setResponseData] = useState<ChartDataType>({
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    });

    const [aucData, setAucData] = useState<ChartDataType>({
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            dose: Number(dose),
            infusionTime: Number(infusionTime),
            dosingInterval: Number(dosingInterval),
            age: Number(age),
            tbw: Number(tbw),
            height: Number(height),
            numberOfDoses: Number(numberOfDoses),
            gender: selectedGender,
            crclDosingType: selectedCrclDosing,
            model: selectedModel
        };

        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/test',
                data: data
            });
            console.log(response.data);

            const pharmaKineticResponse = response.data as PharmaKineticResponse;

            setTrough(pharmaKineticResponse.twoCompartment.trough.toFixed(3));
            setPeak(pharmaKineticResponse.twoCompartment.peak.toFixed(3));
            setAuc_ss(pharmaKineticResponse.twoCompartment.auc_ss.toFixed(3));

            const concentrationData: ChartDataType = {
                name: '2 - Compartment Model',
                labels: pharmaKineticResponse.twoCompartment.concentration.t.map(value => `${value}`),
                datasets: [
                    {
                        data: pharmaKineticResponse.twoCompartment.concentration.C_t
                    }
                ]
            }

            const aucChartData: ChartDataType = {
                name: 'AUC for each dosage',
                labels: pharmaKineticResponse.twoCompartment.auc.t.map(value => `${value}`),
                datasets: [
                    {
                        data: pharmaKineticResponse.twoCompartment.auc.auc_t
                    }
                ]
            }

            setResponseData(concentrationData);
            setAucData(aucChartData);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <h2>Vancomicin Dosing</h2>
            <h2>Enter the following information:</h2>
            <div className="form-chart-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label className='input-label'>Dose:</label>
                        <input className="input-field" type="number" value={dose}
                               onChange={e => setDose((e.target.value))} required/>
                    </div>
                    <div className="input-container">
                        <label className='input-label'>Infusion Time:</label>
                        <input className="input-field" type="number" value={infusionTime}
                               onChange={e => setInfusionTime((e.target.value))} required/>
                    </div>
                    <div className="input-container">
                        <label className='input-label'>Dosing Interval:</label>
                        <input className="input-field" type="number" value={dosingInterval}
                               onChange={e => setDosingInterval((e.target.value))} required/>
                    </div>
                    <div className="input-container">
                        <label className='input-label'>Age:</label>
                        <input className="input-field" type="number" value={age}
                               onChange={e => setAge((e.target.value))}
                               required/>
                    </div>
                    <div className="input-container">
                        <label className='input-label'>TBW:</label>
                        <input className="input-field" type="number" value={tbw}
                               onChange={e => setTbw((e.target.value))}
                               required/>
                    </div>
                    <div className="input-container">
                        <label className='input-label'>Height:</label>
                        <input className="input-field" type="number" value={height}
                               onChange={e => setHeight((e.target.value))} required/>
                    </div>
                    <div className="input-container">
                        <label className='input-label'>Number of Doses:</label>
                        <input className="input-field" type="number" value={numberOfDoses}
                               onChange={e => setNumberOfDoses((e.target.value))} required/>
                    </div>
                    <div className="input-container">
                        <label className='input-label'>Trough:</label>
                        <div>
                            <span style={{color: 'red'}}>{trough}</span> mg/l
                        </div>
                    </div>
                    <div className="input-container">
                        <label className='input-label'>Peak:</label>
                        <div>
                            <span style={{color: 'red'}}>{peak}</span> mg/l
                        </div>
                    </div>
                    <div className="input-container">
                        <label className='input-label'>AUC_SS:</label>
                        <div>
                            <span style={{color: 'red'}}>{auc_ss}</span> mg*hour/liter per day
                        </div>
                    </div>
                    <h3>Gender</h3>
                    {Object.entries(Gender).map(([key, value]) => (
                        <div key={key}>
                            <input
                                type="radio"
                                id={key}
                                name="gender"
                                value={value}
                                checked={selectedGender === value}
                                onChange={handleGenderChange}
                            />
                            <label htmlFor={key}>{value}</label>
                        </div>
                    ))}
                    <h3>CrCl Dosing Type</h3>
                    {Object.entries(CrclDosing).map(([key, value]) => (
                        <div key={key}>
                            <input
                                type="radio"
                                id={key}
                                name="crclDosing"
                                value={value}
                                checked={selectedCrclDosing === value}
                                onChange={handleCrclDosingChange}
                            />
                            <label htmlFor={key}>{value}</label>
                        </div>
                    ))}
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3>Model</h3>
                        <button type="submit" style={{fontSize: '20px', padding: '10px 20px', width: '200px'}}>Submit
                        </button>
                    </div>
                    {Object.entries(ModelEnum).map(([key, value]) => (
                        <div key={key}>
                            <input
                                type="radio"
                                id={key}
                                name="model"
                                value={value}
                                checked={selectedModel === value}
                                onChange={handleModelChange}
                            />
                            <label htmlFor={key}>{value}</label>
                        </div>
                    ))}
                </form>
                <div className="chart-wrapper">
                    {responseData && Object.keys(responseData).length > 0 && <LineChart {...responseData} />}
                    {aucData && Object.keys(aucData).length > 0 && <LineChart1 {...aucData} />}
                </div>
            </div>
        </div>
    );
}

export default MyForm;