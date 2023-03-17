export interface IImageModel {
    src: string;
    RecordPk:number;
    RecordFk:number;
  
  }


export class ImageModel implements IImageModel
{
  
    constructor (public src: string,public RecordPk:number,
        public  RecordFk: number)
    {}
}
