/* eslint-disable no-eval */
import { Scene, LineLayer, PointLayer, Popup } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import * as React from 'react';

export default class Map extends React.Component {
  private scene: Scene;

  private initMap() {
    this.scene = new Scene({
      id: 'map',
      map: new Mapbox({
        pitch: 20,
        // @ts-ignore
        style: {
          version: 8,
          sprite: 'https://lzxue.github.io/font-glyphs/sprite/sprite',
          glyphs:
            'https://gw.alipayobjects.com/os/antvdemo/assets/mapbox/glyphs/{fontstack}/{range}.pbf',
          sources: {},
          layers: [
            {
              id: 'background',
              type: 'background',
              paint: {
                'background-color': '#2b2b3a',
              },
            },
          ],
        },
        center: [3.438, 40.16797],
        zoom: 0.51329,
        minZoom: 0.2,
      }),
    });
  }

  private addLayer() {
    Promise.all([
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json').then(d =>
        d.json(),
      ),
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/4472780b-fea1-4fc2-9e4b-3ca716933dc7.json',
      ).then(d => d.text()),
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/a5ac7bce-181b-40d1-8a16-271356264ad8.json',
      ).then(d => d.text()),
    ]).then(res => {
      const [world, dot, flyLine] = res;
      const dotData = eval(dot);
      const flydata = eval(flyLine).map((item: any) => {
        const latLng1 = item.from.split(',').map((e: number) => e * 1);
        const latLng2 = item.to.split(',').map((e: number) => e * 1);
        return { coord: [latLng1, latLng2] };
      });
      const worldLine = new LineLayer()
        .source(world)
        .color('#41fc9d')
        .size(0.5)
        .style({
          opacity: 0.4,
        });
      const dotPoint = new PointLayer()
        .source(dotData, {
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        })
        .shape('circle')
        .color('#ffed11')
        .animate(true)
        .size(40)
        .style({
          opacity: 1.0,
        });
      const flyLineLayer = new LineLayer()
        .source(flydata, {
          parser: {
            type: 'json',
            coordinates: 'coord',
          },
        })
        .color('#ff6b34')
        .shape('arc3d')
        .size(2)
        .animate({
          interval: 2,
          trailLength: 2,
          duration: 1,
        })
        .style({
          opacity: 1,
        });
      this.scene.addLayer(worldLine);
      this.scene.addLayer(dotPoint);
      this.scene.addLayer(flyLineLayer);

      flyLineLayer.on('mousemove', e => {
        const popup = new Popup({
          offsets: [0, 0],
          closeButton: false,
        })
          .setLnglat(e.lngLat)
          .setHTML(
            `地理可视化引擎 AntV L7:  <a  target='_blank', href='https://github.com/antvis/L7'>GitHub</a>`,
          );
        this.scene.addPopup(popup);
      });
    });
  }

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    this.initMap();
    this.addLayer();
  }

  public render() {
    return (
      <div
        id="map"
        style={{
          position: 'relative',
          width: '100%',
          height: '452px',
        }}
      />
    );
  }
}
