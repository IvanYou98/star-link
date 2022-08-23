import React, { useEffect, useState } from 'react'
import { Button, Spin, List, Avatar, Checkbox } from 'antd'
import satelliteIcon from "../../assets/images/satellite.svg"
import './SatList.css'

const SatList = ({ isLoading, sateInfo, onShow }) => {
    const [selectedSatellite, setSelectedSatellite] = useState([]);
    const onChoose = (e, item) => {
        setSelectedSatellite(updateList(e.target.checked, item));
    };

    useEffect(() => {
        if (isLoading) {
            setSelectedSatellite([]);
        }
    }, [isLoading])

    const onTrack = () => {
        onShow(selectedSatellite);
    }


    const updateList = (checked, item) => {
        const found = selectedSatellite.some(i => i.satid === item.satid);
        if (checked && !found) {
            return [...selectedSatellite, item];
        }
        if (!checked && found) {
            return selectedSatellite.filter(i => i.satid !== item.satid);
        }
    }

    const sateList = sateInfo ? sateInfo.above : [];
    return (
        <div className="sat-list-box">
            <div className="btn-container">
                <Button
                    type='primary'
                    disabled={!selectedSatellite || selectedSatellite.length === 0}
                    className="sat-list-btn"
                    onClick={onTrack}
                >Track</Button>
            </div>
            <hr />

            {
                isLoading ?
                    <div className='spin-box'>
                        <Spin tip="Loading" size='large' />
                    </div>
                    :
                    <List
                        className="sat-list"
                        itemLayout="horizontal"
                        dataSource={sateList}
                        renderItem={(item) => (
                            <List.Item actions={[<Checkbox onChange={e => onChoose(e, item)} />]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={satelliteIcon} />}
                                    title={<p>{item.satname}</p>}
                                    description={`Launch Date: ${item.launchDate}`}
                                />
                            </List.Item>
                        )}
                    />
            }
        </div>
    )
}

export default SatList