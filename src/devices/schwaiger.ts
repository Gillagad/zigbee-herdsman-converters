import fz from '../converters/fromZigbee';
import tz from '../converters/toZigbee';
import * as exposes from '../lib/exposes';
import * as m from '../lib/modernExtend';
import * as reporting from '../lib/reporting';
import {DefinitionWithExtend} from '../lib/types';

const e = exposes.presets;

export const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ['SPW35Z-D0'],
        model: 'ZHS-15',
        vendor: 'Schwaiger',
        description: 'Power socket on/off with power consumption monitoring',
        fromZigbee: [fz.on_off, fz.electrical_measurement],
        toZigbee: [tz.on_off],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement']);
            await reporting.onOff(endpoint);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint);
            await reporting.rmsVoltage(endpoint);
            await reporting.rmsCurrent(endpoint);
            await reporting.activePower(endpoint);
        },
        exposes: [e.switch(), e.power(), e.current(), e.voltage()],
    },
    {
        zigbeeModel: ['ZBT-RGBWLight-GLS0844', 'HAL300'],
        model: 'HAL300',
        vendor: 'Schwaiger',
        description: 'Tint LED bulb E27 806 lumen, dimmable, color, white 1800-6500K',
        extend: [m.light({colorTemp: {range: undefined}, color: true})],
    },
    {
        zigbeeModel: ['ZBT-DIMLight-Candle0800'],
        model: 'HAL600',
        vendor: 'Schwaiger',
        description: 'LED candle bulb E14 470 lumen, dimmable, color, white 2700K',
        extend: [m.light()],
    },
    {
        fingerprint: [{modelID: 'ZBT-CCTLight-GU100904', manufacturerName: 'LDS'}],
        model: 'HAL500',
        vendor: 'Schwaiger',
        description: 'LED bulb GU10 350 lumen, dimmable, color, white 2700-6500K',
        extend: [m.light({colorTemp: {range: [153, 370]}})],
    },
    {
        zigbeeModel: ['ZBT-DIMLight-GU100800'],
        model: 'HAL400',
        vendor: 'Schwaiger',
        description: 'LED Schwaiger HAL400 GU10 dimmable, warm white',
        extend: [m.light()],
    },
    {
        zigbeeModel: ['ZBT-RGBWLight-C4700114'],
        model: 'HAL800',
        vendor: 'Schwaiger',
        description: 'LED candle bulb E14 470 lumen, dimmable, color, white 1800-6500K',
        extend: [m.light({colorTemp: {range: [153, 555]}, color: true})],
    },
    {
        zigbeeModel: ['ZBT-RGBWLight-GU100114'],
        model: 'HAL550',
        vendor: 'Schwaiger',
        description: 'Smart light bulb LED RGB dimmable GU10',
        extend: [m.light({colorTemp: {range: [153, 555]}, color: {modes: ['xy', 'hs'], enhancedHue: true}})],
    },
];
