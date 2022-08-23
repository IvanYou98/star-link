import React, { useState } from 'react'
import { Row, Col } from 'antd'
import "./Main.css"
import SatSetting from '../satSetting/SatSetting'
import SatList from '../satList/SatList'
import WorldMap from '../worldMap/WorldMap'
import { BASE_URL } from '../../constants'
import axios from 'axios'

const Main = () => {
    const [settings, setSettings] = useState({});
    const [sateInfo, setSateInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sateList, setSateList] = useState([])

    const getSettings = (settings) => {
        setSettings(settings);
        fetchAvailableSatellites(settings);
    }

    const getSelectedSatellites = (satelliteList) => {
        console.log(satelliteList);
        setSateList([...satelliteList]);
    }

    const fetchAvailableSatellites = (settings) => {
        // get satellite info from the server
        const { latitude, longitude, elevation, altitude } = settings;

        const url = `${BASE_URL}/nearby/?latitude=${latitude}&longitude=${longitude}&elevation=${elevation}&altitude=${altitude}`;
        setIsLoading(true);
        axios.get(url)
            .then(res => {
                console.log(res.data);
                setSateInfo(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })
    }

    return (
        <Row className='main'>
            <Col span={8} className="left-side">
                <SatSetting onFind={getSettings} />
                <SatList
                    onShow={getSelectedSatellites}
                    isLoading={isLoading}
                    sateInfo={sateInfo} />
            </Col>
            <Col span={16} className="right-side">
                <WorldMap satData={sateList} observerData={settings} />
            </Col>
        </Row>
    )
}

export default Main