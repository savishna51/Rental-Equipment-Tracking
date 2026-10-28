namespace retcl;

using { retcl.DamagePhotos, retcl.ConditionLogs } from './schema';

type ShotType : String(20) enum {
    FRONT;
    REAR;
    LEFT;
    RIGHT;
    TOP_PLATE;
    METER;
    DAMAGE;
};

extend DamagePhotos with {
    CONDITION   : Association to ConditionLogs;
    SHOT_TYPE   : ShotType;
    SHA256      : String(64);
    SIZE_BYTES  : Integer;
    CAPTURED_AT : Timestamp;
    LATITUDE    : Decimal(9,6);
    LONGITUDE   : Decimal(9,6);
    THUMBNAIL   : LargeBinary;
};

extend ConditionLogs with {
    photos : Association to many DamagePhotos on photos.CONDITION = $self;
};

annotate DamagePhotos with {
    MEDIA_TYPE    @Core.IsMediaType;
    PHOTO_CONTENT @Core.MediaType: MEDIA_TYPE  @Core.ContentDisposition.Filename: FILE_NAME;
    THUMBNAIL     @Core.MediaType: 'image/jpeg';
    CONDITION     @title: '{i18n>CONDITION}';
    SHOT_TYPE     @title: '{i18n>SHOT_TYPE}';
    SHA256        @title: '{i18n>SHA256}';
    SIZE_BYTES    @title: '{i18n>SIZE_BYTES}';
    CAPTURED_AT   @title: '{i18n>CAPTURED_AT}';
    LATITUDE      @title: '{i18n>LATITUDE}';
    LONGITUDE     @title: '{i18n>LONGITUDE}';
};