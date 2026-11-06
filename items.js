/* 꾸독 아이템 목록 (상점 카탈로그) — index.html과 admin.html이 함께 사용
   · 새 아이템: 해당 슬롯/타입 배열에 {id,name,img,cost,d:'올린날짜'} 한 줄 추가
   · 이름·캐시·카테고리·NEW날짜·숨김·썸네일 조정은 admin.html(모임장 대시보드)에서 덮어쓸 수 있음
     → Firestore rooms/{room}/config/items 의 meta 맵. 여기 값은 '기본값' */
const CHARP='char/';                 // 레포 char/ 폴더 (Vercel 루트 기준)

const ITEMS={
  eyes:[
    {id:'eyes_basic',name:'기본',img:CHARP+'eyes/base_eyes_01.png'},
    {id:'eyes_wow',  name:'반짝',img:CHARP+'eyes/face_eyes01.png'},
    {id:'eyes_calm', name:'스윗',img:CHARP+'eyes/face_eyes02.png'},
    {id:'eyes_3', name:'눈3', img:CHARP+'eyes/face_eyes_03.png'},   // 0살·무료
    {id:'eyes_4', name:'눈4', img:CHARP+'eyes/face_eyes_04.png'},   // 0살·무료
  ],
  mouth:[
    {id:'mouth_basic',name:'기본',img:CHARP+'mouth/base_mouth_01.png'},
    {id:'mouth_oh',   name:'오물',img:CHARP+'mouth/face_mouth01.png'},
    {id:'mouth_grin', name:'활짝',img:CHARP+'mouth/face_mouth02.png'},
    {id:'mouth_3', name:'입3', img:CHARP+'mouth/face_mouth_03.png'}, // 0살·무료
    {id:'mouth_4', name:'입4', img:CHARP+'mouth/face_mouth_04.png'}, // 0살·무료
  ],
  hair:[
    {id:'hair_m',name:'기본(남)', img:CHARP+'hair/hair_010.png'},
    {id:'hair_w',name:'기본(여)', img:CHARP+'hair/hair_000.png'},
    {id:'hair_1',name:'단발',     img:CHARP+'hair/hair_001.png'},
    {id:'hair_2',name:'장발',     img:CHARP+'hair/hair_002.png'},
    {id:'hair_3',name:'웨이브단발',img:CHARP+'hair/hair_003.png'},
    {id:'hair_4',name:'웨이브장발',img:CHARP+'hair/hair_004.png'},
    {id:'hair_5',name:'포니테일',  img:CHARP+'hair/hair_005.png'},
    {id:'hair_6',name:'남자웨이브가르마',img:CHARP+'hair/hair_006.png'},
    {id:'hair_7',name:'남자슬릭',      img:CHARP+'hair/hair_007.png'},
    {id:'hair_8',name:'남자투블럭',    img:CHARP+'hair/hair_008.png'},
    {id:'hair_9',name:'남자바가지',    img:CHARP+'hair/hair_009.png'},
    {id:'hair_11',name:'빵빵이',img:CHARP+'hair/hair_011.png', cost:5},
    {id:'hair_12',name:'재영님그라데이션(갈색)',img:CHARP+'hair/hair_012.png', cost:5},
    {id:'hair_13',name:'재영님그라데이션(노란)',img:CHARP+'hair/hair_013.png', cost:5},
  ],
  cloth_top:[
    {id:'top_1', name:'상의1', img:CHARP+'cloth/top/top_001.png'},
    {id:'top_2', name:'상의2', img:CHARP+'cloth/top/top_002.png'},
    {id:'top_3', name:'상의3', img:CHARP+'cloth/top/top_003.png'},
    {id:'top_4', name:'상의4', img:CHARP+'cloth/top/top_004.png'},
    {id:'top_5', name:'상의5', img:CHARP+'cloth/top/top_005.png'},
    {id:'top_6', name:'상의6', img:CHARP+'cloth/top/top_006.png'},
    {id:'top_7', name:'상의7', img:CHARP+'cloth/top/top_007.png'},
    {id:'top_8', name:'상의8', img:CHARP+'cloth/top/top_008.png'},
    {id:'top_9', name:'상의9', img:CHARP+'cloth/top/top_009.png'},
    {id:'top_10',name:'상의10',img:CHARP+'cloth/top/top_010.png'},
    {id:'top_11',name:'블라우스(남색)',img:CHARP+'cloth/top/top011.png',cost:5},
    {id:'top_12',name:'블라우스(화이트)',img:CHARP+'cloth/top/top_012.png',cost:5},
    {id:'top_13',name:'꾸데단가라(블랙)',img:CHARP+'cloth/top/top_013.png',cost:15},
    {id:'top_14',name:'꾸데단가라(초록)',img:CHARP+'cloth/top/top_014.png',cost:15},
    {id:'top_15',name:'꾸데단가라(빨강)',img:CHARP+'cloth/top/top_015.png',cost:15},
    {id:'top_16',name:'꾸데단가라(블루)',img:CHARP+'cloth/top/top_016.png',cost:15},
    {id:'top_17',name:'나그랑반팔(블랙)',img:CHARP+'cloth/top/top_017.png',cost:10},
    {id:'top_18',name:'나그랑레터링반팔(회네)',img:CHARP+'cloth/top/top_018.png',cost:10},
    {id:'top_19',name:'나그랑레터링반팔(밤)',img:CHARP+'cloth/top/top_019.png',cost:10},
    // ▼ 맨투맨
    {id:'mtm_001',name:'맨투맨1',img:CHARP+'cloth/top/mtm_001.png',cost:3},
    {id:'mtm_002',name:'맨투맨2',img:CHARP+'cloth/top/mtm_002.png',cost:3},
    {id:'mtm_003',name:'맨투맨3',img:CHARP+'cloth/top/mtm_003.png',cost:3},
    {id:'mtm_004',name:'맨투맨4',img:CHARP+'cloth/top/mtm_004.png',cost:3},
    {id:'mtm_005',name:'맨투맨5',img:CHARP+'cloth/top/mtm_005.png',cost:3},
    {id:'mtm_006',name:'맨투맨6',img:CHARP+'cloth/top/mtm_006.png',cost:3},
    {id:'mtm_007',name:'맨투맨7',img:CHARP+'cloth/top/mtm_007.png',cost:3},
    {id:'mtm_008',name:'맨투맨8',img:CHARP+'cloth/top/mtm_008.png',cost:3},
    {id:'mtm_009',name:'맨투맨9',img:CHARP+'cloth/top/mtm_009.png',cost:3},
    {id:'mtm_010',name:'맨투맨10',img:CHARP+'cloth/top/mtm_010.png',cost:3},
    {id:'mtm_011',name:'맨투맨11',img:CHARP+'cloth/top/mtm_011.png',cost:3},
    {id:'mtm_012',name:'맨투맨12',img:CHARP+'cloth/top/mtm_012.png',cost:3},
    {id:'mtm_013',name:'맨투맨13',img:CHARP+'cloth/top/mtm_013.png',cost:3},
    {id:'mtm_014',name:'맨투맨14',img:CHARP+'cloth/top/mtm_014.png',cost:3},
    {id:'mtm_015',name:'맨투맨15',img:CHARP+'cloth/top/mtm_015.png',cost:3},
    {id:'mtm_016',name:'맨투맨16',img:CHARP+'cloth/top/mtm_016.png',cost:3},
    {id:'mtm_017',name:'맨투맨17',img:CHARP+'cloth/top/mtm_017.png',cost:20},
    {id:'mtm_018',name:'맨투맨18',img:CHARP+'cloth/top/mtm_018.png',cost:20},
    {id:'mtm_019',name:'맨투맨19',img:CHARP+'cloth/top/mtm_019.png',cost:20},
    {id:'mtm_020',name:'맨투맨20',img:CHARP+'cloth/top/mtm_020.png',cost:20},
    {id:'mtm_021',name:'맨투맨21',img:CHARP+'cloth/top/mtm_021.png',cost:20},
    {id:'mtm_022',name:'맨투맨22',img:CHARP+'cloth/top/mtm_022.png',cost:20},
    {id:'mtm_023',name:'맨투맨23',img:CHARP+'cloth/top/mtm_023.png',cost:20},
    {id:'mtm_024',name:'맨투맨24',img:CHARP+'cloth/top/mtm_024.png',cost:20},
    {id:'mtm_025',name:'맨투맨25',img:CHARP+'cloth/top/mtm_025.png',cost:20},
    {id:'mtm_026',name:'맨투맨26',img:CHARP+'cloth/top/mtm_026.png',cost:20},
    {id:'mtm_027',name:'맨투맨27',img:CHARP+'cloth/top/mtm_027.png',cost:20},
    {id:'mtm_028',name:'맨투맨28',img:CHARP+'cloth/top/mtm_028.png',cost:20},
    {id:'mtm_029',name:'맨투맨29',img:CHARP+'cloth/top/mtm_029.png',cost:20},
    {id:'mtm_030',name:'맨투맨30',img:CHARP+'cloth/top/mtm_030.png',cost:20},
    {id:'mtm_031',name:'맨투맨31',img:CHARP+'cloth/top/mtm_031.png',cost:20},
    {id:'mtm_032',name:'맨투맨32',img:CHARP+'cloth/top/mtm_032.png',cost:20},
    {id:'ops_1', name:'사과원피스', img:CHARP+'cloth/ops/ops_001.png'},
    {id:'ops_2',name:'재영님꽃ops(화이트)',img:CHARP+'cloth/ops/ops_002.png',cost:10},
    {id:'ops_3', name:'재영님꽃ops(핑크)',img:CHARP+'cloth/ops/ops_003.png',cost:10},
    {id:'ops_4',name:'재영님꽃ops(블루)',img:CHARP+'cloth/ops/ops_004.png',cost:10},
    {id:'ops_5',name:'재영님꽃ops(노란)',img:CHARP+'cloth/ops/ops_005.png',cost:10},
    // ▼ 크리스마스 (상의)
    {id:'christmas_001',name:'산타상의1',img:CHARP+'cloth/top/christmas_001.png',cost:35,d:'2026-11-06'},
    {id:'christmas_002',name:'산타상의2',img:CHARP+'cloth/top/christmas_002.png',cost:35,d:'2026-11-06'},
    {id:'top_christmas_001',name:'루돌프니트1',img:CHARP+'cloth/top/top_christmas_001.png',cost:35,d:'2026-11-06'},
    {id:'top_christmas_002',name:'루돌프니트2',img:CHARP+'cloth/top/top_christmas_002.png',cost:35,d:'2026-11-06'},
    {id:'top_christmas_003',name:'루돌프니트3',img:CHARP+'cloth/top/top_christmas_003.png',cost:35,d:'2026-11-06'},
    
  ],
  cloth_bottom:[
    {id:'bot_1', name:'하의1', img:CHARP+'cloth/bottom/bottom_01.png'},
    {id:'bot_2', name:'하의2', img:CHARP+'cloth/bottom/bottom_02.png'},
    {id:'bot_3', name:'하의3', img:CHARP+'cloth/bottom/bottom_03.png'},
    {id:'bot_4', name:'하의4', img:CHARP+'cloth/bottom/bottom_04.png'},
    {id:'bot_5', name:'하의5', img:CHARP+'cloth/bottom/bottom_05.png'},
    {id:'bot_6', name:'하의6', img:CHARP+'cloth/bottom/bottom_06.png'},
    {id:'bot_7', name:'하의7', img:CHARP+'cloth/bottom/bottom_07.png'},
    {id:'bot_8', name:'하의8', img:CHARP+'cloth/bottom/bottom_08.png'},
    {id:'bot_9', name:'하의9', img:CHARP+'cloth/bottom/bottom_09.png'},
    {id:'bot_10',name:'하의10',img:CHARP+'cloth/bottom/bottom_10.png'},
    // ▼ 반바지
    {id:'pants_001', name:'반바지1', img:CHARP+'cloth/bottom/pants/pants_001.png', cost:3},
    {id:'pants_002', name:'반바지2', img:CHARP+'cloth/bottom/pants/pants_002.png', cost:3},
    {id:'pants_003', name:'반바지3', img:CHARP+'cloth/bottom/pants/pants_003.png', cost:3},
    {id:'pants_004', name:'반바지4', img:CHARP+'cloth/bottom/pants/pants_004.png', cost:3},
    {id:'pants_005', name:'반바지5', img:CHARP+'cloth/bottom/pants/pants_005.png', cost:3},
    {id:'pants_006', name:'반바지6', img:CHARP+'cloth/bottom/pants/pants_006.png', cost:3},
    {id:'pants_007', name:'반바지7', img:CHARP+'cloth/bottom/pants/pants_007.png', cost:3},
    // ▼ 와이드팬츠(긴바지)
    {id:'wdpants_001', name:'와이드팬츠1', img:CHARP+'cloth/bottom/pants/wdpants_001.png', cost:7},
    {id:'wdpants_002', name:'와이드팬츠2', img:CHARP+'cloth/bottom/pants/wdpants_002.png', cost:7},
    {id:'wdpants_003', name:'와이드팬츠3', img:CHARP+'cloth/bottom/pants/wdpants_003.png', cost:7},
    {id:'wdpants_004', name:'와이드팬츠4', img:CHARP+'cloth/bottom/pants/wdpants_004.png', cost:7},
    {id:'wdpants_005', name:'와이드팬츠5', img:CHARP+'cloth/bottom/pants/wdpants_005.png', cost:7},
    {id:'wdpants_006', name:'와이드팬츠6', img:CHARP+'cloth/bottom/pants/wdpants_006.png', cost:7},
    {id:'wdpants_007', name:'와이드팬츠7', img:CHARP+'cloth/bottom/pants/wdpants_007.png', cost:7},
    {id:'wdpants_008', name:'와이드팬츠8', img:CHARP+'cloth/bottom/pants/wdpants_008.png', cost:7},
    {id:'wdpants_009', name:'와이드팬츠9', img:CHARP+'cloth/bottom/pants/wdpants_009.png', cost:15},
    {id:'wdpants_010', name:'와이드팬츠10', img:CHARP+'cloth/bottom/pants/wdpants_010.png', cost:15},
    {id:'wdpants_011', name:'와이드팬츠11', img:CHARP+'cloth/bottom/pants/wdpants_011.png', cost:20},
    {id:'wdpants_012', name:'와이드팬츠12', img:CHARP+'cloth/bottom/pants/wdpants_012.png', cost:20},
    {id:'wdpants_013', name:'와이드팬츠13', img:CHARP+'cloth/bottom/pants/wdpants_013.png', cost:20},
    {id:'wdpants_014', name:'와이드팬츠14', img:CHARP+'cloth/bottom/pants/wdpants_014.png', cost:30},
    {id:'wdpants_015', name:'와이드팬츠15', img:CHARP+'cloth/bottom/pants/wdpants_015.png', cost:20},
    {id:'wdpants_016', name:'와이드팬츠16', img:CHARP+'cloth/bottom/pants/wdpants_016.png', cost:20},
    {id:'wdpants_017', name:'와이드팬츠17', img:CHARP+'cloth/bottom/pants/wdpants_017.png', cost:20},
    {id:'wdpants_018', name:'와이드팬츠18', img:CHARP+'cloth/bottom/pants/wdpants_018.png', cost:20},
    {id:'wdpants_019', name:'와이드팬츠19', img:CHARP+'cloth/bottom/pants/wdpants_019.png', cost:20},
    {id:'wdpants_020', name:'와이드팬츠20', img:CHARP+'cloth/bottom/pants/wdpants_020.png', cost:20},
    {id:'wdpants_021', name:'와이드팬츠21', img:CHARP+'cloth/bottom/pants/wdpants_021.png', cost:20},
    {id:'wdpants_022', name:'와이드팬츠22', img:CHARP+'cloth/bottom/pants/wdpants_022.png', cost:30},
    {id:'wdpants_023', name:'와이드팬츠23', img:CHARP+'cloth/bottom/pants/wdpants_023.png', cost:30},
    // ▼ 치마
    {id:'skirt_001', name:'치마1', img:CHARP+'cloth/bottom/skirt/skirt_001.png', cost:5},
    {id:'skirt_002', name:'치마2', img:CHARP+'cloth/bottom/skirt/skirt_002.png', cost:5},
    {id:'skirt_003', name:'치마3', img:CHARP+'cloth/bottom/skirt/skirt_003.png', cost:5},
    {id:'skirt_004', name:'치마4', img:CHARP+'cloth/bottom/skirt/skirt_004.png', cost:5},
    {id:'skirt_005', name:'치마5', img:CHARP+'cloth/bottom/skirt/skirt_005.png', cost:5},
    {id:'skirt_006', name:'치마6', img:CHARP+'cloth/bottom/skirt/skirt_006.png', cost:5},
    {id:'skirt_007', name:'치마7', img:CHARP+'cloth/bottom/skirt/skirt_007.png', cost:5},
    {id:'skirt_008', name:'치마8', img:CHARP+'cloth/bottom/skirt/skirt_008.png', cost:5},
    {id:'skirt_009', name:'치마9', img:CHARP+'cloth/bottom/skirt/skirt_009.png', cost:5},
    {id:'skirt_010', name:'치마10', img:CHARP+'cloth/bottom/skirt/skirt_010.png', cost:5},
    {id:'skirt_011', name:'치마11', img:CHARP+'cloth/bottom/skirt/skirt_011.png', cost:20},
    {id:'skirt_012', name:'치마12', img:CHARP+'cloth/bottom/skirt/skirt_012.png', cost:20},
    {id:'skirt_013', name:'치마13', img:CHARP+'cloth/bottom/skirt/skirt_013.png', cost:20},
    {id:'skirt_014', name:'치마14', img:CHARP+'cloth/bottom/skirt/skirt_014.png', cost:20},
    {id:'skirt_015', name:'치마15', img:CHARP+'cloth/bottom/skirt/skirt_015.png', cost:20},
    {id:'skirt_016', name:'치마16', img:CHARP+'cloth/bottom/skirt/skirt_016.png', cost:20},
    {id:'skirt_017', name:'치마17', img:CHARP+'cloth/bottom/skirt/skirt_017.png', cost:20},
    {id:'skirt_018', name:'치마18', img:CHARP+'cloth/bottom/skirt/skirt_018.png', cost:20},
    {id:'skirt_019', name:'치마19', img:CHARP+'cloth/bottom/skirt/skirt_019.png', cost:20},
    {id:'skirt_020', name:'치마20', img:CHARP+'cloth/bottom/skirt/skirt_020.png', cost:20},
    {id:'skirt_021', name:'치마21', img:CHARP+'cloth/bottom/skirt/skirt_021.png', cost:20},
    // ▼ 크리스마스 (하의)
    {id:'christmas_003',name:'산타바지',img:CHARP+'cloth/bottom/christmas_003.png',cost:35,d:'2026-11-06'},
  ],
  // 아우터 — 상의 위에 겹쳐 입는 별도 슬롯 (상의+아우터 동시 착용)
  outer:[
    // ▼ 패딩
    {id:'outer_001',name:'패딩1',img:CHARP+'cloth/outer/outer_001.png',cost:25,d:'2026-11-06'},
    {id:'outer_002',name:'패딩2',img:CHARP+'cloth/outer/outer_002.png',cost:25,d:'2026-11-06'},
    {id:'outer_003',name:'패딩3',img:CHARP+'cloth/outer/outer_003.png',cost:25,d:'2026-11-06'},
    {id:'outer_004',name:'패딩4',img:CHARP+'cloth/outer/outer_004.png',cost:25,d:'2026-11-06'},
    {id:'outer_005',name:'패딩5',img:CHARP+'cloth/outer/outer_005.png',cost:25,d:'2026-11-06'},
    {id:'outer_006',name:'패딩6',img:CHARP+'cloth/outer/outer_006.png',cost:25,d:'2026-11-06'},
    {id:'outer_007',name:'패딩7',img:CHARP+'cloth/outer/outer_007.png',cost:25,d:'2026-11-06'},
    {id:'outer_008',name:'패딩8',img:CHARP+'cloth/outer/outer_008.png',cost:25,d:'2026-11-06'},
    {id:'outer_009',name:'패딩9',img:CHARP+'cloth/outer/outer_009.png',cost:25,d:'2026-11-06'},
    {id:'outer_010',name:'패딩10',img:CHARP+'cloth/outer/outer_010.png',cost:25,d:'2026-11-06'},
    {id:'outer_011',name:'패딩11',img:CHARP+'cloth/outer/outer_011.png',cost:25,d:'2026-11-06'},
    {id:'outer_012',name:'패딩12',img:CHARP+'cloth/outer/outer_012.png',cost:25,d:'2026-11-06'},
    // ▼ 더플코트
    {id:'outer_coat_001',name:'더플코트1',img:CHARP+'cloth/outer/outer_coat_001.png',cost:25,d:'2026-11-06'},
    {id:'outer_coat_002',name:'더플코트2',img:CHARP+'cloth/outer/outer_coat_002.png',cost:25,d:'2026-11-06'},
    {id:'outer_coat_003',name:'더플코트3',img:CHARP+'cloth/outer/outer_coat_003.png',cost:25,d:'2026-11-06'},
    {id:'outer_coat_004',name:'더플코트4',img:CHARP+'cloth/outer/outer_coat_004.png',cost:25,d:'2026-11-06'},
    // ▼ 후드
    {id:'outer_hood_002',name:'후드2',img:CHARP+'cloth/outer/outer_hood_002.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_003',name:'후드3',img:CHARP+'cloth/outer/outer_hood_003.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_004_1',name:'후드4-1',img:CHARP+'cloth/outer/outer_hood_004_1.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_004',name:'후드4',img:CHARP+'cloth/outer/outer_hood_004.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_005',name:'후드5',img:CHARP+'cloth/outer/outer_hood_005.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_006',name:'후드6',img:CHARP+'cloth/outer/outer_hood_006.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_007',name:'후드7',img:CHARP+'cloth/outer/outer_hood_007.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_008',name:'후드8',img:CHARP+'cloth/outer/outer_hood_008.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_009',name:'후드9',img:CHARP+'cloth/outer/outer_hood_009.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_010',name:'후드10',img:CHARP+'cloth/outer/outer_hood_010.png',cost:25,d:'2026-11-06'},
    {id:'outer_hood_011',name:'후드11',img:CHARP+'cloth/outer/outer_hood_011.png',cost:25,d:'2026-11-06'},
    // ▼ 무스탕
    {id:'outer_jp_001',name:'무스탕1',img:CHARP+'cloth/outer/outer_jp_001.png',cost:25,d:'2026-11-06'},
    {id:'outer_jp_002',name:'무스탕2',img:CHARP+'cloth/outer/outer_jp_002.png',cost:25,d:'2026-11-06'},
    {id:'outer_jp_003',name:'무스탕3',img:CHARP+'cloth/outer/outer_jp_003.png',cost:25,d:'2026-11-06'},
    {id:'outer_jp_004',name:'무스탕4',img:CHARP+'cloth/outer/outer_jp_004.png',cost:25,d:'2026-11-06'},
    {id:'outer_jp_005',name:'무스탕5',img:CHARP+'cloth/outer/outer_jp_005.png',cost:25,d:'2026-11-06'},
    {id:'outer_jp_006',name:'무스탕6',img:CHARP+'cloth/outer/outer_jp_006.png',cost:25,d:'2026-11-06'},
    {id:'outer_jp_007',name:'무스탕7',img:CHARP+'cloth/outer/outer_jp_007.png',cost:25,d:'2026-11-06'},
    // ▼ 퍼조끼
    {id:'outer_vest_001',name:'퍼조끼1',img:CHARP+'cloth/outer/outer_vest_001.png',cost:25,d:'2026-11-06'},
    {id:'outer_vest_002',name:'퍼조끼2',img:CHARP+'cloth/outer/outer_vest_002.png',cost:25,d:'2026-11-06'},
    {id:'outer_vest_003',name:'퍼조끼3',img:CHARP+'cloth/outer/outer_vest_003.png',cost:25,d:'2026-11-06'},
    // ▼ 집업
    {id:'outer_zipup_001',name:'집업1',img:CHARP+'cloth/outer/outer_zipup_001.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_002',name:'집업2',img:CHARP+'cloth/outer/outer_zipup_002.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_003',name:'집업3',img:CHARP+'cloth/outer/outer_zipup_003.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_004',name:'집업4',img:CHARP+'cloth/outer/outer_zipup_004.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_005',name:'집업5',img:CHARP+'cloth/outer/outer_zipup_005.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_006',name:'집업6',img:CHARP+'cloth/outer/outer_zipup_006.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_007',name:'집업7',img:CHARP+'cloth/outer/outer_zipup_007.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_008',name:'집업8',img:CHARP+'cloth/outer/outer_zipup_008.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_009',name:'집업9',img:CHARP+'cloth/outer/outer_zipup_009.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_010',name:'집업10',img:CHARP+'cloth/outer/outer_zipup_010.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_011',name:'집업11',img:CHARP+'cloth/outer/outer_zipup_011.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_012',name:'집업12',img:CHARP+'cloth/outer/outer_zipup_012.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_013',name:'집업13',img:CHARP+'cloth/outer/outer_zipup_013.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_014',name:'집업14',img:CHARP+'cloth/outer/outer_zipup_014.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_015',name:'집업15',img:CHARP+'cloth/outer/outer_zipup_015.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_016',name:'집업16',img:CHARP+'cloth/outer/outer_zipup_016.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_017',name:'집업17',img:CHARP+'cloth/outer/outer_zipup_017.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_018',name:'집업18',img:CHARP+'cloth/outer/outer_zipup_018.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_019',name:'집업19',img:CHARP+'cloth/outer/outer_zipup_019.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_020',name:'집업20',img:CHARP+'cloth/outer/outer_zipup_020.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_021',name:'집업21',img:CHARP+'cloth/outer/outer_zipup_021.png',cost:25,d:'2026-11-06'},
    {id:'outer_zipup_022',name:'집업22',img:CHARP+'cloth/outer/outer_zipup_022.png',cost:25,d:'2026-11-06'},
  ],
  // 신발 — 발 위치에만 그림이 있어 전신에서 발에 보임
  shoes:[
    {id:'shoes_1',name:'빨간구두',img:CHARP+'shoes/shoes_001.png', cost:1},
    {id:'shoes_2',name:'갈색구두',img:CHARP+'shoes/shoes_002.png', cost:1},
    // ▼ 어그
    {id:'ugg_001',name:'어그부츠',img:CHARP+'shoes/ugg_001.png',cost:10,d:'2026-11-06'},
  ],
  // 가방 — 신발과 별도 슬롯이라 신발+가방 동시 착용 가능
  bag:[
    // ▼ 크로스백
    {id:'crossbodybag_001', name:'크로스백1', img:CHARP+'bag/crossbodybag_001.png', cost:7},
    {id:'crossbodybag_002', name:'크로스백2', img:CHARP+'bag/crossbodybag_002.png', cost:7},
    {id:'crossbodybag_003', name:'크로스백3', img:CHARP+'bag/crossbodybag_003.png', cost:7},
    {id:'crossbodybag_004', name:'크로스백4', img:CHARP+'bag/crossbodybag_004.png', cost:7},
    {id:'crossbodybag_005', name:'크로스백5', img:CHARP+'bag/crossbodybag_005.png', cost:7},
    {id:'crossbodybag_006', name:'크로스백6', img:CHARP+'bag/crossbodybag_006.png', cost:7},
    {id:'crossbodybag_007', name:'크로스백7', img:CHARP+'bag/crossbodybag_007.png', cost:7},
    {id:'crossbodybag_008', name:'크로스백8', img:CHARP+'bag/crossbodybag_008.png', cost:7},
    {id:'crossbodybag_009', name:'크로스백9', img:CHARP+'bag/crossbodybag_009.png', cost:7},
    {id:'crossbodybag_010', name:'크로스백10', img:CHARP+'bag/crossbodybag_010.png', cost:7},
    // ▼ 숄더백
    {id:'shoulderbag_001', name:'숄더백1', img:CHARP+'bag/shoulderbag_001.png', cost:7},
    {id:'shoulderbag_002', name:'숄더백2', img:CHARP+'bag/shoulderbag_002.png', cost:7},
    {id:'shoulderbag_003', name:'숄더백3', img:CHARP+'bag/shoulderbag_003.png', cost:7},
    {id:'shoulderbag_004', name:'숄더백4', img:CHARP+'bag/shoulderbag_004.png', cost:7},
    {id:'shoulderbag_005', name:'숄더백5', img:CHARP+'bag/shoulderbag_005.png', cost:7},
    {id:'shoulderbag_006', name:'숄더백6', img:CHARP+'bag/shoulderbag_006.png', cost:7},
    {id:'shoulderbag_007', name:'숄더백7', img:CHARP+'bag/shoulderbag_007.png', cost:7},
    {id:'shoulderbag_008', name:'숄더백8', img:CHARP+'bag/shoulderbag_008.png', cost:7},
    {id:'shoulderbag_009', name:'숄더백9', img:CHARP+'bag/shoulderbag_009.png', cost:7},
    {id:'shoulderbag_010', name:'숄더백10', img:CHARP+'bag/shoulderbag_010.png', cost:7},
    {id:'shoulderbag_011', name:'숄더백11', img:CHARP+'bag/shoulderbag_011.png', cost:7},
    {id:'shoulderbag_012', name:'숄더백12', img:CHARP+'bag/shoulderbag_012.png', cost:7},
    // ▼ 토트백
    {id:'totebag_001', name:'토트백1', img:CHARP+'bag/totebag_001.png', cost:7},
    {id:'totebag_002', name:'토트백2', img:CHARP+'bag/totebag_002.png', cost:7},
    {id:'totebag_003', name:'토트백3', img:CHARP+'bag/totebag_003.png', cost:7},
    {id:'totebag_004', name:'토트백4', img:CHARP+'bag/totebag_004.png', cost:7},
    {id:'totebag_005', name:'토트백5', img:CHARP+'bag/totebag_005.png', cost:7},
    {id:'totebag_006', name:'토트백6', img:CHARP+'bag/totebag_006.png', cost:7},
    {id:'totebag_007', name:'토트백7', img:CHARP+'bag/totebag_007.png', cost:7},
    {id:'totebag_008', name:'토트백8', img:CHARP+'bag/totebag_008.png', cost:7},
    {id:'totebag_009', name:'토트백9', img:CHARP+'bag/totebag_009.png', cost:7},
    {id:'totebag_010', name:'토트백10', img:CHARP+'bag/totebag_010.png', cost:7},
    {id:'totebag_011', name:'토트백11', img:CHARP+'bag/totebag_011.png', cost:7},
    {id:'totebag_012', name:'토트백12', img:CHARP+'bag/totebag_012.png', cost:7},
    {id:'totebag_013', name:'토트백13', img:CHARP+'bag/totebag_013.png', cost:7},
  ],
};

// 악세사리: 타입별 1개씩 동시 착용 (z-순서대로 hair 위에 쌓임)
const ACC_TYPES=[
  // 모자 — 헤어장식에서 분리 (과일탈 5종 + 뒤캡모자·스냅백 7종). 헤드셋보다 먼저 그려지도록 헤어장식보다 앞에 배치(=헤어장식이 모자 위로 쌓임)
  {key:'hat',name:'모자',items:[
    {id:'hairacc_3',name:'사과탈',img:CHARP+'acc/hairacc/hairacc_003.png', cost:5}, // 1살·
    {id:'hairacc_4',name:'풋사과탈',img:CHARP+'acc/hairacc/hairacc_004.png', cost:5},
    {id:'hairacc_5',name:'수박탈',img:CHARP+'acc/hairacc/hairacc_005.png', cost:5},
    {id:'hairacc_6',name:'오렌지탈',img:CHARP+'acc/hairacc/hairacc_006.png', cost:5},
    {id:'hairacc_7',name:'감자탈',img:CHARP+'acc/hairacc/hairacc_007.png', cost:5},
    {id:'cap_1',name:'뒤캡모자(블랙)',img:CHARP+'acc/cap/cap_001.png',cost:7},
    {id:'cap_2',name:'뒤캡모자(블루)',img:CHARP+'acc/cap/cap_002.png',cost:7},
    {id:'cap_3',name:'뒤캡모자(밤색)',img:CHARP+'acc/cap/cap_003.png',cost:7},
    {id:'cap_4',name:'뒤캡모자(빨강)',img:CHARP+'acc/cap/cap_004.png',cost:7},
    {id:'cap_5',name:'뒤캡모자(주황)',img:CHARP+'acc/cap/cap_005.png',cost:7},
    {id:'cap_6',name:'뒤캡모자(버터)',img:CHARP+'acc/cap/cap_006.png',cost:7},
    {id:'cap_7',name:'뒤캡모자(아이)',img:CHARP+'acc/cap/cap_007.png',cost:7},
    // ▼ 비니
    {id:'hat_beanie_001',name:'비니1',img:CHARP+'acc/beanie/hat_beanie_001.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_002',name:'비니2',img:CHARP+'acc/beanie/hat_beanie_002.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_003',name:'비니3',img:CHARP+'acc/beanie/hat_beanie_003.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_004',name:'비니4',img:CHARP+'acc/beanie/hat_beanie_004.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_005',name:'비니5',img:CHARP+'acc/beanie/hat_beanie_005.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_006',name:'비니6',img:CHARP+'acc/beanie/hat_beanie_006.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_007',name:'비니7',img:CHARP+'acc/beanie/hat_beanie_007.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_008',name:'비니8',img:CHARP+'acc/beanie/hat_beanie_008.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_009',name:'비니9',img:CHARP+'acc/beanie/hat_beanie_009.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_010',name:'비니10',img:CHARP+'acc/beanie/hat_beanie_010.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_011',name:'비니11',img:CHARP+'acc/beanie/hat_beanie_011.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_012',name:'비니12',img:CHARP+'acc/beanie/hat_beanie_012.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_013',name:'비니13',img:CHARP+'acc/beanie/hat_beanie_013.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_014',name:'비니14',img:CHARP+'acc/beanie/hat_beanie_014.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_015',name:'비니15',img:CHARP+'acc/beanie/hat_beanie_015.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_016',name:'비니16',img:CHARP+'acc/beanie/hat_beanie_016.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_017',name:'비니17',img:CHARP+'acc/beanie/hat_beanie_017.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_018',name:'비니18',img:CHARP+'acc/beanie/hat_beanie_018.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_019',name:'비니19',img:CHARP+'acc/beanie/hat_beanie_019.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_020',name:'비니20',img:CHARP+'acc/beanie/hat_beanie_020.png',cost:5,d:'2026-11-06'},
    {id:'hat_beanie_021',name:'비니21',img:CHARP+'acc/beanie/hat_beanie_021.png',cost:5,d:'2026-11-06'},
    // ▼ 크리스마스 (모자)
    {id:'christmas_004',name:'산타모자',img:CHARP+'acc/beanie/christmas_004.png',cost:35,d:'2026-11-06'},
  ]},
  // 귀마개 — 모자와 별개 타입이라 비니+귀마개 동시 착용 가능 (모자 위에 그려짐)
  {key:'earmuff',name:'귀마개',items:[
    {id:'earmuff_001',name:'귀마개1',img:CHARP+'acc/earmuff/earmuff_001.png',cost:5,d:'2026-11-06'},
    {id:'earmuff_002',name:'귀마개2',img:CHARP+'acc/earmuff/earmuff_002.png',cost:5,d:'2026-11-06'},
    {id:'earmuff_003',name:'귀마개3',img:CHARP+'acc/earmuff/earmuff_003.png',cost:5,d:'2026-11-06'},
  ]},
  {key:'hairacc',name:'헤어장식',items:[
    {id:'hairacc_1',name:'사과머리띠',img:CHARP+'acc/hairacc/hairacc_001.png'},
    {id:'hairacc_2',name:'검정헤드셋',img:CHARP+'acc/hairacc/headset_001.png', cost:5},
    {id:'hairacc_9',name:'머리띠(하늘)',img:CHARP+'acc/hairacc/hairacc_009.png'},          
    {id:'hairacc_10',name:'머리띠(노란)',img:CHARP+'acc/hairacc/hairacc_010.png'},       
    {id:'hairacc_11',name:'머리띠(갈색)',img:CHARP+'acc/hairacc/hairacc_011.png'},          
    {id:'hairacc_12',name:'머리띠(남색)',img:CHARP+'acc/hairacc/hairacc_012.png'},       
    {id:'hairacc_13',name:'머리띠(빨간)',img:CHARP+'acc/hairacc/hairacc_013.png'},
    {id:'hairacc_15',name:'헤어핀(아이)',img:CHARP+'acc/hairacc/hairacc_015.png'},
    {id:'hairacc_17',name:'헤어핀(빨간)',img:CHARP+'acc/hairacc/hairacc_016.png'},
    {id:'hairacc_16',name:'헤어핀(차콜)',img:CHARP+'acc/hairacc/hairacc_017.png'},
    {id:'headset_2',name:'헤드셋(회색)',img:CHARP+'acc/hairacc/headset_002.png',cost:3},
    {id:'headset_3',name:'헤드셋(핑크)',img:CHARP+'acc/hairacc/headset_003.png',cost:1},
    {id:'headset_4',name:'헤드셋(노란)',img:CHARP+'acc/hairacc/headset_004.png',cost:1},
    {id:'headset_5',name:'헤드셋(블루)',img:CHARP+'acc/hairacc/headset_005.png',cost:1},
    {id:'headset_6',name:'헤드셋(그린)',img:CHARP+'acc/hairacc/headset_006.png',cost:1},
    {id:'hairacc_18',name:'방장',img:CHARP+'acc/hairacc/hairacc_018.png'},         
    {id:'hairacc_19',name:'성공',img:CHARP+'acc/hairacc/hairacc_019.png'},
    {id:'hairacc_20',name:'열정',img:CHARP+'acc/hairacc/hairacc_020.png'},
    // ▼ MBTI 머리띠
    {id:'mbti_001',name:'MBTI머리띠1',img:CHARP+'acc/hairacc/mbti_001.png', cost:10},
    {id:'mbti_002',name:'MBTI머리띠2',img:CHARP+'acc/hairacc/mbti_002.png', cost:10},
    {id:'mbti_003',name:'MBTI머리띠3',img:CHARP+'acc/hairacc/mbti_003.png', cost:10},
    {id:'mbti_004',name:'MBTI머리띠4',img:CHARP+'acc/hairacc/mbti_004.png', cost:10},
    {id:'mbti_005',name:'MBTI머리띠5',img:CHARP+'acc/hairacc/mbti_005.png', cost:10},
    {id:'mbti_006',name:'MBTI머리띠6',img:CHARP+'acc/hairacc/mbti_006.png', cost:10},
    {id:'mbti_007',name:'MBTI머리띠7',img:CHARP+'acc/hairacc/mbti_007.png', cost:10},
    {id:'mbti_008',name:'MBTI머리띠8',img:CHARP+'acc/hairacc/mbti_008.png', cost:10},
    {id:'mbti_009',name:'MBTI머리띠9',img:CHARP+'acc/hairacc/mbti_009.png', cost:10},
    {id:'mbti_010',name:'MBTI머리띠10',img:CHARP+'acc/hairacc/mbti_010.png', cost:10},
    {id:'mbti_011',name:'MBTI머리띠11',img:CHARP+'acc/hairacc/mbti_011.png', cost:10},
    {id:'mbti_012',name:'MBTI머리띠12',img:CHARP+'acc/hairacc/mbti_012.png', cost:10},
    {id:'mbti_013',name:'MBTI머리띠13',img:CHARP+'acc/hairacc/mbti_013.png', cost:10},
    {id:'mbti_014',name:'MBTI머리띠14',img:CHARP+'acc/hairacc/mbti_014.png', cost:10},
    {id:'mbti_015',name:'MBTI머리띠15',img:CHARP+'acc/hairacc/mbti_015.png', cost:10},
    {id:'mbti_016',name:'MBTI머리띠16',img:CHARP+'acc/hairacc/mbti_016.png', cost:10}, 
  ]},
  // 안경 — 헤어장식과 별개 타입이라 머리띠·헤드셋과 동시 착용 가능
  {key:'glasses',name:'안경',items:[
    {id:'glass_1',name:'검정 선글라스',img:CHARP+'acc/glass/glass_001.png', cost:3},
    {id:'glass_2',name:'갈색 뿔테',img:CHARP+'acc/glass/glass_002.png', cost:3},
    {id:'glass_3',name:'검정 뿔테',img:CHARP+'acc/glass/glass_003.png', cost:3},
  ]},
  // 귀걸이 — 헤어장식과 별개 타입이라 머리띠와 동시 착용 가능
  {key:'earring',name:'귀걸이',items:[
    {id:'earring_1',name:'하트한쪽귀걸이',img:CHARP+'acc/earring_001.png'},
    {id:'earring_2',name:'기본은색귀걸이',img:CHARP+'acc/earring_002.png'},
  ]},
  // 목걸이
  {key:'neck',name:'목걸이',items:[
    {id:'neck_1',name:'하트목걸이',img:CHARP+'acc/neck_001.png'},
  ]},
  // 목도리 — 목걸이와 별개 타입 (목걸이 위에 그려짐)
  {key:'neckwarm',name:'목도리',items:[
    {id:'neckwarm_001',name:'목도리1',img:CHARP+'acc/neckwarm/acc_neckwarm_001.png',cost:5,d:'2026-11-06'},
    {id:'neckwarm_002',name:'목도리2',img:CHARP+'acc/neckwarm/acc_neckwarm_002.png',cost:5,d:'2026-11-06'},
    {id:'neckwarm_003',name:'목도리3',img:CHARP+'acc/neckwarm/acc_neckwarm_003.png',cost:5,d:'2026-11-06'},
    {id:'neckwarm_004',name:'목도리4',img:CHARP+'acc/neckwarm/acc_neckwarm_004.png',cost:5,d:'2026-11-06'},
    {id:'neckwarm_005',name:'목도리5',img:CHARP+'acc/neckwarm/acc_neckwarm_005.png',cost:5,d:'2026-11-06'},
    {id:'neckwarm_006',name:'목도리6',img:CHARP+'acc/neckwarm/acc_neckwarm_006.png',cost:5,d:'2026-11-06'},
    {id:'neckwarm_007',name:'목도리7',img:CHARP+'acc/neckwarm/acc_neckwarm_007.png',cost:5,d:'2026-11-06'},
  ]},
  // 얼굴 추가요소(수염·주근깨) — 악세사리 저장구조를 재사용하되 '얼굴' 탭에서만 노출
  {key:'beard',  name:'수염',  items:[{id:'face_etc_001',name:'수염',  img:CHARP+'face/face_etc_001.png'}]},
  {key:'freckle',name:'주근깨',items:[{id:'face_etc_002',name:'주근깨',img:CHARP+'face/face_etc_002.png'}]},
];

/* ---------- 배경 ----------
   · 컬러 배경: {id, hex:'#RRGGBB', name, cost}
   · 이미지 배경: char/bg/ 에 파일을 넣고 {id, img:CHARP+'bg/파일.png', base:'#로딩 중 바탕색', name, cost, d:'올린날짜'}
   · 대시보드에서 이름·캐시·색·NEW·숨김·순서를 바꾸고, 새 컬러 배경도 추가할 수 있음 (meta) */
const BGS=[
  {id:'bg_none',  hex:'',       name:'기본'},
  {id:'bg_cream', hex:'#FFF6E8',name:'크림'},
  {id:'bg_peach', hex:'#FCE7D8',name:'복숭아'},
  {id:'bg_mint',  hex:'#E2F0E8',name:'민트'},
  {id:'bg_sky',   hex:'#E3EEF7',name:'하늘'},
  {id:'bg_lav',   hex:'#ECE6F5',name:'라벤더'},
  {id:'bg_pink',  hex:'#FBE6EE',name:'핑크'},
  {id:'bg_sand',  hex:'#F0E9DA',name:'모래'},
  {id:'bg_gray',  hex:'#ECECEC',name:'연그레이'},
  {id:'bg_lemon', hex:'#FFEBB8',name:'레몬', cost:1},
  {id:'bg_orange',hex:'#FFC28C',name:'주황', cost:1},
  {id:'bg_brown', hex:'#C39983',name:'갈색', cost:1},
  {id:'bg_dsky',  hex:'#95C2DA',name:'진하늘', cost:1},
  {id:'bg_green', hex:'#55A67E',name:'그린', cost:1},
  {id:'bg_pink2', hex:'#FFB8B9',name:'핑크', cost:1},
];


/* ---------- 대시보드 덮어쓰기(meta) 적용 ----------
   meta = { 아이템id: { n:이름, c:캐시, cat:'cloth_top'|'dress'|'outer'|...|'acc:hat', d:'YYYY-MM-DD'(''=신상 해제), h:true(숨김), tz,tx,ty(썸네일 확대·이동), o(진열 순서 1,2,3…) } }
   항상 위의 기본값에서 다시 계산하므로 여러 번 불러도 안전 */
function _baseCat(slot,it){return slot==='cloth_top'&&(it.dress===true||(it.id||'').startsWith('ops'))?'dress':slot;}
const ITEM_BASE=(()=>{const all=[];
  Object.keys(ITEMS).forEach(s=>ITEMS[s].forEach(it=>all.push({it:Object.assign({},it),cat:_baseCat(s,it)})));
  ACC_TYPES.forEach(t=>t.items.forEach(it=>all.push({it:Object.assign({},it),cat:'acc:'+t.key})));
  BGS.forEach(it=>all.push({it:Object.assign({},it),cat:'bg'}));
  return all;})();
const HEX_RE=/^#[0-9a-fA-F]{6}$/;
function applyItemMeta(meta){
  meta=meta||{};
  Object.keys(ITEMS).forEach(s=>{ITEMS[s].length=0;}); ACC_TYPES.forEach(t=>{t.items.length=0;}); BGS.length=0;
  ITEM_BASE.forEach(b=>{
    const o=meta[b.it.id]||{}, it=Object.assign({},b.it);
    if(typeof o.n==='string'&&o.n.trim())it.name=o.n.trim();
    if(typeof o.c==='number'&&o.c>=0)it.cost=o.c;
    if(typeof o.d==='string'){ if(o.d)it.d=o.d; else delete it.d; }
    if(o.h)it.hidden=true;
    ['tz','tx','ty','o'].forEach(k=>{if(typeof o[k]==='number')it[k]=o[k];});
    if(b.cat==='bg'){ if(typeof o.hex==='string'&&HEX_RE.test(o.hex)&&!it.img&&it.id!=='bg_none')it.hex=o.hex; BGS.push(it); return; }
    let cat=(typeof o.cat==='string'&&o.cat)||b.cat;
    if(cat==='dress'){it.dress=true;cat='cloth_top';}
    else if(cat==='cloth_top'){it.dress=false;}
    if(cat.indexOf('acc:')===0){const t=ACC_TYPES.find(x=>x.key===cat.slice(4));if(t){t.items.push(it);return;}cat=b.cat.replace('dress','cloth_top');}
    (ITEMS[cat]||ITEMS[b.cat==='dress'?'cloth_top':b.cat]).push(it);
  });
  // 대시보드에서 새로 만든 컬러 배경 (meta[id].add)
  Object.keys(meta).forEach(id=>{const o=meta[id];
    if(!o||!o.add||ITEM_BASE.some(b=>b.it.id===id)||typeof o.hex!=='string'||!HEX_RE.test(o.hex))return;
    const it={id,hex:o.hex,name:(o.n||'새 배경'),cost:typeof o.c==='number'?o.c:0,custom:true};
    if(typeof o.d==='string'&&o.d)it.d=o.d; if(o.h)it.hidden=true; if(typeof o.o==='number')it.o=o.o;
    BGS.push(it);});
}
