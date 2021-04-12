// Cesium
// czml for driving satellite orbits + timeframe?
// https://github.com/CesiumGS/cesium/blob/49f7a3d9ffa62429a5504f4662d94f44ab07e396/Apps/SampleData/simple.czml#L686
// - https://github.com/CesiumGS/cesium/blob/49f7a3d9ffa62429a5504f4662d94f44ab07e396/Apps/Sandcastle/gallery/CZML.html
// Reference for camera handling: https://sandcastle.cesium.com/?src=Camera.html


// Two Line Element

import { Directive, ElementRef, OnInit } from '@angular/core';
import { Cartesian2, Cartesian3, Cartesian4, Cartographic, CesiumTerrainProvider, Color, GeoJsonDataSource, HeightReference, IonResource, LabelStyle, PolylineCollection, PolylineOutlineMaterialProperty, VerticalOrigin, Viewer } from 'cesium';
import CzmlDataSource from 'cesium/Source/DataSources/CzmlDataSource';
@Directive({
  selector: 'cesium-viewer'
})
export class CesiumDirective implements OnInit {
  viewer: Viewer;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // Put initialization code for the Cesium viewer here
    this.viewer = new Viewer(this.el.nativeElement, {
      terrainProvider: new CesiumTerrainProvider({
        url: IonResource.fromAssetId(1)
      }),
    });

    this.viewer.scene.canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const mousePosition = new Cartesian2(event.clientX, event.clientY);
      const selectedLocation = this.viewer.scene.pickPosition(mousePosition);

      this.setMarkerInPos(Cartographic.fromCartesian(selectedLocation));
    }, false);

    let promise = IonResource.fromAssetId(356418)
      .then(ok => GeoJsonDataSource.load(ok))
      .then(geoSource => {
        return this.viewer.dataSources.add(geoSource);
      })
    this.viewer.dataSources.add(CzmlDataSource.load('../../assets/simple.czml'))

    this.viewer.entities.add({
      name:
        "Orange line with black outline at height and following the surface",
      polyline: {
        positions: Cartesian3.fromRadiansArrayHeights([
          0,
          0,
          1000000,
          1.42,
          0.75381,
          100000
        ]),
        width: 5,
        material: new PolylineOutlineMaterialProperty({
          color: Color.ORANGE,
          outlineWidth: 2,
          outlineColor: Color.BLACK,
        }),
      },
    });



  }

  setMarkerInPos(positionCartographic: Cartographic) {
    console.log(positionCartographic.latitude, positionCartographic.longitude, positionCartographic.height)
    let { x, y, z } = new Cartesian3(positionCartographic.latitude, positionCartographic.longitude, positionCartographic.height);
    const cartDegrees = Cartesian3.fromRadians(x, y, z);

    console.log(cartDegrees.x, cartDegrees.y, cartDegrees.z)

    this.viewer.scene.pickTranslucentDepth = true;
    const locationMarker = this.viewer.entities.add({
      name: 'location',
      position: Cartesian3.fromRadians(positionCartographic.longitude, positionCartographic.latitude, 50),
      point: {
        pixelSize: 5,
        color: Color.RED,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        heightReference: HeightReference.RELATIVE_TO_GROUND
      },
      label: {
        text: 'check',
        font: '14pt monospace',
        style: LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: VerticalOrigin.BOTTOM,
        pixelOffset: new Cartesian2(0, -9),
        heightReference: HeightReference.RELATIVE_TO_GROUND
      }
    });
  }


}
