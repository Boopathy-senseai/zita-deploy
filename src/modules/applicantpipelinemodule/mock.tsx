export const matchOptions = [
  { value: '> 90%', label: '91-100' },
  { value: '> 80%', label: '81-100' },
  { value: '> 70%', label: '71-100' },
  { value: '> 60%', label: '61-100' },
  { value: '<= 60%', label: '0-60' },
  { value: 'Any', label: '' },
];

export const profileOptions = [
  { value: 'Viewed', label: '1' },
  { value: 'Yet to View', label: '0' },
  { value: 'Both', label: '' },
];

export const experienceOption = [
  { value: '', label: 'All' },
  { value: '0-1', label: '0-1 Year' },
  { value: '1-2', label: '1-2 Years' },
  { value: '3-5', label: '3-5 Years' },
  { value: '6-10', label: '6-10 Years' },
  { value: '10-30', label: '10+ Years' },
];

// useEffect(() => {
//   if (isAny) {
//     setQualification("");
//   } else if (isBachelors && isDoctorate && isMasters && isOther) {
//     setQualification("Bachelor,Doctorate,Master,Other");
//   } else if (isBachelors && isDoctorate && isOther) {
//     setQualification("Bachelor,Doctorate,Other");
//   } else if (isMasters && isDoctorate && isOther) {
//     setQualification("Master,Doctorate,Other");
//   } else if (isBachelors && isDoctorate && isOther) {
//     setQualification("Bachelor,Doctorate,Other");
//   } else if (isBachelors && isMasters && isOther) {
//     setQualification("Bachelor,Master,Other");
//   } else if (isBachelors && isDoctorate) {
//     setQualification("Bachelor,Doctorate");
//   } else if (isBachelors && isMasters) {
//     setQualification("Bachelor,Master");
//   } else if (isBachelors && isOther) {
//     setQualification("Bachelor,Other");
//   } else if (isDoctorate && isMasters) {
//     setQualification("Doctorate,Master");
//   } else if (isOther && isMasters) {
//     setQualification("Other,Master");
//   } else if (isOther && isDoctorate) {
//     setQualification("Doctorate,Master");
//   } else if (isBachelors) {
//     setQualification("Bachelor");
//   } else if (isDoctorate) {
//     setQualification("Doctorate");
//   } else if (isMasters) {
//     setQualification("Master");
//   } else if (isOther) {
//     setQualification("Other");
//   }
// }, [isBachelors, isDoctorate, isMasters, isAny, isOther]);

export const skillList = [
  {
    label: '.NET',
    value: '.NET',
  },
  {
    label: '.NET CORE',
    value: '.NET CORE',
  },
  {
    label: '.NET FRAMEWORK',
    value: '.NET FRAMEWORK',
  },
  {
    label: '.NET MVC',
    value: '.NET MVC',
  },
  {
    label: '.NET PROGRAMMING',
    value: '.NET PROGRAMMING',
  },
  {
    label: 'A/B TESTING',
    value: 'A/B TESTING',
  },
  {
    label: 'AB INITIO',
    value: 'AB INITIO',
  },
  {
    label: 'ACCORD.NET',
    value: 'ACCORD.NET',
  },
  {
    label: 'ACES',
    value: 'ACES',
  },
  {
    label: 'ACTIVE DIRECTORY',
    value: 'ACTIVE DIRECTORY',
  },
  {
    label: 'ACTIVEANDROID',
    value: 'ACTIVEANDROID',
  },
  {
    label: 'ACTIVEJPA',
    value: 'ACTIVEJPA',
  },
  {
    label: 'ADABOOST',
    value: 'ADABOOST',
  },
  {
    label: 'ADO.NET',
    value: 'ADO.NET',
  },
  {
    label: 'ADO.NET ENTITY FRAMEWORK',
    value: 'ADO.NET ENTITY FRAMEWORK',
  },
  {
    label: 'ADOBE AEM',
    value: 'ADOBE AEM',
  },
  {
    label: 'ADOBE ANALYTICS',
    value: 'ADOBE ANALYTICS',
  },
  {
    label: 'ADOBE FLASH',
    value: 'ADOBE FLASH',
  },
  {
    label: 'ADOBE FLEX',
    value: 'ADOBE FLEX',
  },
  {
    label: 'ADOBE ILLUSTRATOR',
    value: 'ADOBE ILLUSTRATOR',
  },
  {
    label: 'ADOBE PAGEMAKER',
    value: 'ADOBE PAGEMAKER',
  },
  {
    label: 'ADOBE PHOTOSHOP',
    value: 'ADOBE PHOTOSHOP',
  },
  {
    label: 'ADOBE PREMIERE',
    value: 'ADOBE PREMIERE',
  },
  {
    label: 'ADOBE SPARK',
    value: 'ADOBE SPARK',
  },
  {
    label: 'ADOBE XD',
    value: 'ADOBE XD',
  },
  {
    label: 'ADVANCED EXCEL',
    value: 'ADVANCED EXCEL',
  },
  {
    label: 'ADVANCED MICROSOFT EXCEL FUNCTIONS',
    value: 'ADVANCED MICROSOFT EXCEL FUNCTIONS',
  },
  {
    label: 'ADVANCED SAS 9.4',
    value: 'ADVANCED SAS 9.4',
  },
  {
    label: 'ADWORDS',
    value: 'ADWORDS',
  },
  {
    label: 'AGILE',
    value: 'AGILE',
  },
  {
    label: 'AGINITY',
    value: 'AGINITY',
  },
  {
    label: 'AIML',
    value: 'AIML',
  },
  {
    label: 'AIRCRACK',
    value: 'AIRCRACK',
  },
  {
    label: 'AIRFLOW',
    value: 'AIRFLOW',
  },
  {
    label: 'AIRO',
    value: 'AIRO',
  },
  {
    label: 'AJAX',
    value: 'AJAX',
  },
  {
    label: 'ALEXNET',
    value: 'ALEXNET',
  },
  {
    label: 'ALGORITHM DESIGN',
    value: 'ALGORITHM DESIGN',
  },
  {
    label: 'ALGORITHMS',
    value: 'ALGORITHMS',
  },
  {
    label: 'ALPINE',
    value: 'ALPINE',
  },
  {
    label: 'ALPINE DOCKER',
    value: 'ALPINE DOCKER',
  },
  {
    label: 'ALTERYX',
    value: 'ALTERYX',
  },
  {
    label: 'AMAZON (AWS) REDSHIFT.',
    value: 'AMAZON (AWS) REDSHIFT.',
  },
  {
    label: 'AMAZON AWS',
    value: 'AMAZON AWS',
  },
  {
    label: 'AMAZON CLOUD SERVICES',
    value: 'AMAZON CLOUD SERVICES',
  },
  {
    label: 'AMAZON CLOUDFRONT',
    value: 'AMAZON CLOUDFRONT',
  },
  {
    label: 'AMAZON CLOUDWATCH',
    value: 'AMAZON CLOUDWATCH',
  },
  {
    label: 'AMAZON DATABASES',
    value: 'AMAZON DATABASES',
  },
  {
    label: 'AMAZON DYNAMODB',
    value: 'AMAZON DYNAMODB',
  },
  {
    label: 'AMAZON EC2',
    value: 'AMAZON EC2',
  },
  {
    label: 'AMAZON ECR',
    value: 'AMAZON ECR',
  },
  {
    label: 'AMAZON ECS',
    value: 'AMAZON ECS',
  },
  {
    label: 'AMAZON ELASTICSEARCH SERVICE',
    value: 'AMAZON ELASTICSEARCH SERVICE',
  },
  {
    label: 'AMAZON EMR',
    value: 'AMAZON EMR',
  },
  {
    label: 'AMAZON FREERTOS',
    value: 'AMAZON FREERTOS',
  },
  {
    label: 'AMAZON GLACIER',
    value: 'AMAZON GLACIER',
  },
  {
    label: 'AMAZON LINUX',
    value: 'AMAZON LINUX',
  },
  {
    label: 'AMAZON MACHINE LEARNING',
    value: 'AMAZON MACHINE LEARNING',
  },
  {
    label: 'AMAZON POLLY',
    value: 'AMAZON POLLY',
  },
  {
    label: 'AMAZON RDS',
    value: 'AMAZON RDS',
  },
  {
    label: 'AMAZON RED SHIFT',
    value: 'AMAZON RED SHIFT',
  },
  {
    label: 'AMAZON REDSHIFT',
    value: 'AMAZON REDSHIFT',
  },
  {
    label: 'AMAZON REDSHIFT-L3',
    value: 'AMAZON REDSHIFT-L3',
  },
  {
    label: 'AMAZON REKOGNITION',
    value: 'AMAZON REKOGNITION',
  },
  {
    label: 'AMAZON RELATION DATABASE SERVICES (RDS)',
    value: 'AMAZON RELATION DATABASE SERVICES (RDS)',
  },
  {
    label: 'AMAZON ROUTE 53',
    value: 'AMAZON ROUTE 53',
  },
  {
    label: 'AMAZON S3',
    value: 'AMAZON S3',
  },
  {
    label: 'AMAZON SAGEMAKER',
    value: 'AMAZON SAGEMAKER',
  },
  {
    label: 'AMAZON SIMPLE QUEUING SERVICE',
    value: 'AMAZON SIMPLE QUEUING SERVICE',
  },
  {
    label: 'AMAZON STAGEMAKER',
    value: 'AMAZON STAGEMAKER',
  },
  {
    label: 'AMAZON TRANSCRIBE',
    value: 'AMAZON TRANSCRIBE',
  },
  {
    label: 'AMAZON VPC',
    value: 'AMAZON VPC',
  },
  {
    label: 'AMAZON WEB SERVICES',
    value: 'AMAZON WEB SERVICES',
  },
  {
    label: 'AMAZON WEB SERVICES CLOUD SOLUTION',
    value: 'AMAZON WEB SERVICES CLOUD SOLUTION',
  },
  {
    label: 'AMBARI',
    value: 'AMBARI',
  },
  {
    label: 'ANACONDA',
    value: 'ANACONDA',
  },
  {
    label: 'ANACONDA SPYDER',
    value: 'ANACONDA SPYDER',
  },
  {
    label: 'ANDROID',
    value: 'ANDROID',
  },
  {
    label: 'ANDROID STUDIO',
    value: 'ANDROID STUDIO',
  },
  {
    label: 'ANGULAR',
    value: 'ANGULAR',
  },
  {
    label: 'ANGULAR/REACT',
    value: 'ANGULAR/REACT',
  },
  {
    label: 'ANGULARJS 4.0',
    value: 'ANGULARJS 4.0',
  },
  {
    label: 'ANGULARJS SQL',
    value: 'ANGULARJS SQL',
  },
  {
    label: 'ANJULARJS 1.5',
    value: 'ANJULARJS 1.5',
  },
  {
    label: 'ANN',
    value: 'ANN',
  },
  {
    label: 'ANOMALY-DETECTION',
    value: 'ANOMALY-DETECTION',
  },
  {
    label: 'ANOVA',
    value: 'ANOVA',
  },
  {
    label: 'ANSI SQL',
    value: 'ANSI SQL',
  },
  {
    label: 'ANSIBLE',
    value: 'ANSIBLE',
  },
  {
    label: 'ANSIBLE TOWER',
    value: 'ANSIBLE TOWER',
  },
  {
    label: 'ANT',
    value: 'ANT',
  },
  {
    label: 'ANYPOINT STUDIO',
    value: 'ANYPOINT STUDIO',
  },
  {
    label: 'APACHE',
    value: 'APACHE',
  },
  {
    label: 'APACHE AIRFLOW',
    value: 'APACHE AIRFLOW',
  },
  {
    label: 'APACHE ANT',
    value: 'APACHE ANT',
  },
  {
    label: 'APACHE ARROW',
    value: 'APACHE ARROW',
  },
  {
    label: 'APACHE ATLAS',
    value: 'APACHE ATLAS',
  },
  {
    label: 'APACHE AVRO',
    value: 'APACHE AVRO',
  },
  {
    label: 'APACHE AXIS',
    value: 'APACHE AXIS',
  },
  {
    label: 'APACHE BEAM',
    value: 'APACHE BEAM',
  },
  {
    label: 'APACHE CAMEL',
    value: 'APACHE CAMEL',
  },
  {
    label: 'APACHE CASSANDRA',
    value: 'APACHE CASSANDRA',
  },
  {
    label: 'APACHE CASSANDRA NOSQL',
    value: 'APACHE CASSANDRA NOSQL',
  },
  {
    label: 'APACHE CAYENNE',
    value: 'APACHE CAYENNE',
  },
  {
    label: 'APACHE CORDOVA',
    value: 'APACHE CORDOVA',
  },
  {
    label: 'APACHE COUCHDB',
    value: 'APACHE COUCHDB',
  },
  {
    label: 'APACHE CTAKES',
    value: 'APACHE CTAKES',
  },
  {
    label: 'APACHE DRILL',
    value: 'APACHE DRILL',
  },
  {
    label: 'APACHE DRUID',
    value: 'APACHE DRUID',
  },
  {
    label: 'APACHE FELIX',
    value: 'APACHE FELIX',
  },
  {
    label: 'APACHE FLEX',
    value: 'APACHE FLEX',
  },
  {
    label: 'APACHE FLINK',
    value: 'APACHE FLINK',
  },
  {
    label: 'APACHE FLUME',
    value: 'APACHE FLUME',
  },
  {
    label: 'APACHE GOBBLIN',
    value: 'APACHE GOBBLIN',
  },
  {
    label: 'APACHE HADOOP',
    value: 'APACHE HADOOP',
  },
  {
    label: 'APACHE HADOOP ECOSYSTEM',
    value: 'APACHE HADOOP ECOSYSTEM',
  },
  {
    label: 'APACHE HBASE',
    value: 'APACHE HBASE',
  },
  {
    label: 'APACHE HIGH',
    value: 'APACHE HIGH',
  },
  {
    label: 'APACHE HIVE',
    value: 'APACHE HIVE',
  },
  {
    label: 'APACHE HTTP SERVER',
    value: 'APACHE HTTP SERVER',
  },
  {
    label: 'APACHE HTTPD',
    value: 'APACHE HTTPD',
  },
  {
    label: 'APACHE IGNITE',
    value: 'APACHE IGNITE',
  },
  {
    label: 'APACHE IMPALA',
    value: 'APACHE IMPALA',
  },
  {
    label: 'APACHE JMETER',
    value: 'APACHE JMETER',
  },
  {
    label: 'APACHE KAFKA',
    value: 'APACHE KAFKA',
  },
  {
    label: 'APACHE KAFKA KSQL',
    value: 'APACHE KAFKA KSQL',
  },
  {
    label: 'APACHE KAFKA STREAMS',
    value: 'APACHE KAFKA STREAMS',
  },
  {
    label: 'APACHE KYLIN',
    value: 'APACHE KYLIN',
  },
  {
    label: 'APACHE LUCENE',
    value: 'APACHE LUCENE',
  },
  {
    label: 'APACHE MAVEN',
    value: 'APACHE MAVEN',
  },
  {
    label: 'APACHE MESOS',
    value: 'APACHE MESOS',
  },
  {
    label: 'APACHE MESOSCONFIGURATION',
    value: 'APACHE MESOSCONFIGURATION',
  },
  {
    label: 'APACHE MXNET',
    value: 'APACHE MXNET',
  },
  {
    label: 'APACHE NIFI',
    value: 'APACHE NIFI',
  },
  {
    label: 'APACHE OOZIE',
    value: 'APACHE OOZIE',
  },
  {
    label: 'APACHE PARQUET',
    value: 'APACHE PARQUET',
  },
  {
    label: 'APACHE PHOENIX',
    value: 'APACHE PHOENIX',
  },
  {
    label: 'APACHE PRESTO',
    value: 'APACHE PRESTO',
  },
  {
    label: 'APACHE PULSAR',
    value: 'APACHE PULSAR',
  },
  {
    label: 'APACHE RANGER',
    value: 'APACHE RANGER',
  },
  {
    label: 'APACHE SERVER',
    value: 'APACHE SERVER',
  },
  {
    label: 'APACHE SLING',
    value: 'APACHE SLING',
  },
  {
    label: 'APACHE SOLR',
    value: 'APACHE SOLR',
  },
  {
    label: 'APACHE SPARK DEVELOPMENT',
    value: 'APACHE SPARK DEVELOPMENT',
  },
  {
    label: 'APACHE SPARK FRAMEWORK',
    value: 'APACHE SPARK FRAMEWORK',
  },
  {
    label: 'APACHE SPARK/PYSPARK/MLLIB',
    value: 'APACHE SPARK/PYSPARK/MLLIB',
  },
  {
    label: 'APACHE SPARK3',
    value: 'APACHE SPARK3',
  },
  {
    label: 'APACHE SQOOP',
    value: 'APACHE SQOOP',
  },
  {
    label: 'APACHE STORM',
    value: 'APACHE STORM',
  },
  {
    label: 'APACHE STRUTS',
    value: 'APACHE STRUTS',
  },
  {
    label: 'APACHE SUPERSET',
    value: 'APACHE SUPERSET',
  },
  {
    label: 'APACHE TAPESTRY',
    value: 'APACHE TAPESTRY',
  },
  {
    label: 'APACHE TILES',
    value: 'APACHE TILES',
  },
  {
    label: 'APACHE TOMCAT',
    value: 'APACHE TOMCAT',
  },
  {
    label: 'APACHE TOMCAT APPLICATION SERVER',
    value: 'APACHE TOMCAT APPLICATION SERVER',
  },
  {
    label: 'APACHE VIRTUAL HOSTING',
    value: 'APACHE VIRTUAL HOSTING',
  },
  {
    label: 'APACHE WEB SERVER',
    value: 'APACHE WEB SERVER',
  },
  {
    label: 'APACHE WEBSERVERS',
    value: 'APACHE WEBSERVERS',
  },
  {
    label: 'APACHE ZEPPELIN',
    value: 'APACHE ZEPPELIN',
  },
  {
    label: 'APACHE ZOOKEEPER',
    value: 'APACHE ZOOKEEPER',
  },
  {
    label: 'APEX',
    value: 'APEX',
  },
  {
    label: 'APEX DATA LOADER',
    value: 'APEX DATA LOADER',
  },
  {
    label: 'API GIT',
    value: 'API GIT',
  },
  {
    label: 'APPCELERATOR TITANIUM',
    value: 'APPCELERATOR TITANIUM',
  },
  {
    label: 'APPIAN',
    value: 'APPIAN',
  },
  {
    label: 'APPIUM',
    value: 'APPIUM',
  },
  {
    label: 'APPLE',
    value: 'APPLE',
  },
  {
    label: 'APPLESCRIPT/JAVASCRIPT',
    value: 'APPLESCRIPT/JAVASCRIPT',
  },
  {
    label: 'APPSCRIPT',
    value: 'APPSCRIPT',
  },
  {
    label: 'APPVEYOR',
    value: 'APPVEYOR',
  },
  {
    label: 'APPWORX',
    value: 'APPWORX',
  },
  {
    label: 'APRIORI',
    value: 'APRIORI',
  },
  {
    label: 'APRIORI NAIVE _BAYES',
    value: 'APRIORI NAIVE _BAYES',
  },
  {
    label: 'ARANGODB',
    value: 'ARANGODB',
  },
  {
    label: 'ARCGIS',
    value: 'ARCGIS',
  },
  {
    label: 'ARCHIMATE',
    value: 'ARCHIMATE',
  },
  {
    label: 'ARCOBJECTS',
    value: 'ARCOBJECTS',
  },
  {
    label: 'ARCOBJECTS API',
    value: 'ARCOBJECTS API',
  },
  {
    label: 'ARCOS CREW MANAGER',
    value: 'ARCOS CREW MANAGER',
  },
  {
    label: 'ARDUINO',
    value: 'ARDUINO',
  },
  {
    label: 'ARIMA',
    value: 'ARIMA',
  },
  {
    label: 'ARIMAX',
    value: 'ARIMAX',
  },
  {
    label: 'ARTIFACTORY',
    value: 'ARTIFACTORY',
  },
  {
    label: 'ARTIFACTORY/NEXUS',
    value: 'ARTIFACTORY/NEXUS',
  },
  {
    label: 'ARTIFICIAL NEURAL NETWORK',
    value: 'ARTIFICIAL NEURAL NETWORK',
  },
  {
    label: 'ARTIFICIAL NEURAL NETWORKS',
    value: 'ARTIFICIAL NEURAL NETWORKS',
  },
  {
    label: 'AS 400',
    value: 'AS 400',
  },
  {
    label: 'ASP',
    value: 'ASP',
  },
  {
    label: 'ASP.NET',
    value: 'ASP.NET',
  },
  {
    label: 'ASP.NET FRAMEWORK',
    value: 'ASP.NET FRAMEWORK',
  },
  {
    label: 'ASP.NET MVC',
    value: 'ASP.NET MVC',
  },
  {
    label: 'ASP.NET WEB API',
    value: 'ASP.NET WEB API',
  },
  {
    label: 'ASP.NET WEB FORMS',
    value: 'ASP.NET WEB FORMS',
  },
  {
    label: 'ASP/ASP.NET',
    value: 'ASP/ASP.NET',
  },
  {
    label: 'ASSERTJ',
    value: 'ASSERTJ',
  },
  {
    label: 'ASSOCIATION ANALYSIS',
    value: 'ASSOCIATION ANALYSIS',
  },
  {
    label: 'ASSOCIATION RULE LEARNING',
    value: 'ASSOCIATION RULE LEARNING',
  },
  {
    label: 'ASSOCIATION RULE MINING',
    value: 'ASSOCIATION RULE MINING',
  },
  {
    label: 'ASSOCIATION RULES',
    value: 'ASSOCIATION RULES',
  },
  {
    label: 'ATHENA FRAMEWORK',
    value: 'ATHENA FRAMEWORK',
  },
  {
    label: 'ATLASSIAN JIRA',
    value: 'ATLASSIAN JIRA',
  },
  {
    label: 'ATTENDED INFORMATICA',
    value: 'ATTENDED INFORMATICA',
  },
  {
    label: 'AUC/ROC',
    value: 'AUC/ROC',
  },
  {
    label: 'AUDIO-RECOGNITION',
    value: 'AUDIO-RECOGNITION',
  },
  {
    label: 'AUTO SCALING',
    value: 'AUTO SCALING',
  },
  {
    label: 'AUTOCAD',
    value: 'AUTOCAD',
  },
  {
    label: 'AUTODOCK',
    value: 'AUTODOCK',
  },
  {
    label: 'AUTOENCODER',
    value: 'AUTOENCODER',
  },
  {
    label: 'AUTOENCODERS',
    value: 'AUTOENCODERS',
  },
  {
    label: 'AUTOGLUON',
    value: 'AUTOGLUON',
  },
  {
    label: 'AUTOIT',
    value: 'AUTOIT',
  },
  {
    label: 'AUTOMATION',
    value: 'AUTOMATION',
  },
  {
    label: 'AUTOMATION TESTING',
    value: 'AUTOMATION TESTING',
  },
  {
    label: 'AUTOML',
    value: 'AUTOML',
  },
  {
    label: 'AUTOREGRESSIVE MODEL',
    value: 'AUTOREGRESSIVE MODEL',
  },
  {
    label: 'AUTOSYS',
    value: 'AUTOSYS',
  },
  {
    label: 'AVRO',
    value: 'AVRO',
  },
  {
    label: 'AWK',
    value: 'AWK',
  },
  {
    label: 'AWS',
    value: 'AWS',
  },
  {
    label: 'AWS - EMR',
    value: 'AWS - EMR',
  },
  {
    label: 'AWS ANALYTICAL SERVICES',
    value: 'AWS ANALYTICAL SERVICES',
  },
  {
    label: 'AWS API GATEWAY',
    value: 'AWS API GATEWAY',
  },
  {
    label: 'AWS APIS',
    value: 'AWS APIS',
  },
  {
    label: 'AWS ATHENA',
    value: 'AWS ATHENA',
  },
  {
    label: 'AWS AURORA',
    value: 'AWS AURORA',
  },
  {
    label: 'AWS BATCH',
    value: 'AWS BATCH',
  },
  {
    label: 'AWS BOTO3',
    value: 'AWS BOTO3',
  },
  {
    label: 'AWS BUILD',
    value: 'AWS BUILD',
  },
  {
    label: 'AWS CDK',
    value: 'AWS CDK',
  },
  {
    label: 'AWS CLI',
    value: 'AWS CLI',
  },
  {
    label: 'AWS CLOUD',
    value: 'AWS CLOUD',
  },
  {
    label: 'AWS CLOUDFORMATION',
    value: 'AWS CLOUDFORMATION',
  },
  {
    label: 'AWS CODECOMMIT',
    value: 'AWS CODECOMMIT',
  },
  {
    label: 'AWS CODEDEPLOY',
    value: 'AWS CODEDEPLOY',
  },
  {
    label: 'AWS CODEPIPELINE',
    value: 'AWS CODEPIPELINE',
  },
  {
    label: 'AWS COMPREHEND',
    value: 'AWS COMPREHEND',
  },
  {
    label: 'AWS COMPUTE & CONTAINER SERVICES',
    value: 'AWS COMPUTE & CONTAINER SERVICES',
  },
  {
    label: 'AWS CONFIG',
    value: 'AWS CONFIG',
  },
  {
    label: 'AWS DATA EXCHANGE',
    value: 'AWS DATA EXCHANGE',
  },
  {
    label: 'AWS DEVELOPER',
    value: 'AWS DEVELOPER',
  },
  {
    label: 'AWS DIRECTORY SERVICES',
    value: 'AWS DIRECTORY SERVICES',
  },
  {
    label: 'AWS DW',
    value: 'AWS DW',
  },
  {
    label: 'AWS EBS',
    value: 'AWS EBS',
  },
  {
    label: 'AWS EC2',
    value: 'AWS EC2',
  },
  {
    label: 'AWS EC2/AZURE VIRTUAL MACHINES',
    value: 'AWS EC2/AZURE VIRTUAL MACHINES',
  },
  {
    label: 'AWS ECS',
    value: 'AWS ECS',
  },
  {
    label: 'AWS ECS/AZURE',
    value: 'AWS ECS/AZURE',
  },
  {
    label: 'AWS ECS/EKS',
    value: 'AWS ECS/EKS',
  },
  {
    label: 'AWS ELASTIC BEANSTALK',
    value: 'AWS ELASTIC BEANSTALK',
  },
  {
    label: 'AWS EMR',
    value: 'AWS EMR',
  },
  {
    label: 'AWS EVENT',
    value: 'AWS EVENT',
  },
  {
    label: 'AWS GLUE',
    value: 'AWS GLUE',
  },
  {
    label: 'AWS GREEN GRASS',
    value: 'AWS GREEN GRASS',
  },
  {
    label: 'AWS HIGHLY DESIRED',
    value: 'AWS HIGHLY DESIRED',
  },
  {
    label: 'AWS IAM',
    value: 'AWS IAM',
  },
  {
    label: 'AWS IAM & S3',
    value: 'AWS IAM & S3',
  },
  {
    label: 'AWS INSPECTOR',
    value: 'AWS INSPECTOR',
  },
  {
    label: 'AWS KINESIS',
    value: 'AWS KINESIS',
  },
  {
    label: 'AWS LAMBDA',
    value: 'AWS LAMBDA',
  },
  {
    label: 'AWS MANAGED SERVICES',
    value: 'AWS MANAGED SERVICES',
  },
  {
    label: 'AWS NEPTUNE',
    value: 'AWS NEPTUNE',
  },
  {
    label: 'AWS NETWORKING',
    value: 'AWS NETWORKING',
  },
  {
    label: 'AWS OPSWORKS',
    value: 'AWS OPSWORKS',
  },
  {
    label: 'AWS ORACLE',
    value: 'AWS ORACLE',
  },
  {
    label: 'AWS OUTPOST',
    value: 'AWS OUTPOST',
  },
  {
    label: 'AWS PAAS',
    value: 'AWS PAAS',
  },
  {
    label: 'AWS QUICKSIGHT',
    value: 'AWS QUICKSIGHT',
  },
  {
    label: 'AWS QUICKSIGHT3',
    value: 'AWS QUICKSIGHT3',
  },
  {
    label: 'AWS RDS',
    value: 'AWS RDS',
  },
  {
    label: 'AWS RDS POSTGRES',
    value: 'AWS RDS POSTGRES',
  },
  {
    label: 'AWS REDSHIFT',
    value: 'AWS REDSHIFT',
  },
  {
    label: 'AWS S3',
    value: 'AWS S3',
  },
  {
    label: 'AWS SAGEMAKER',
    value: 'AWS SAGEMAKER',
  },
  {
    label: 'AWS SDK',
    value: 'AWS SDK',
  },
  {
    label: 'AWS SNOWBALL',
    value: 'AWS SNOWBALL',
  },
  {
    label: 'AWS SNS',
    value: 'AWS SNS',
  },
  {
    label: 'AWS SOLUTIONS ARCHITECT',
    value: 'AWS SOLUTIONS ARCHITECT',
  },
  {
    label: 'AWS SQS',
    value: 'AWS SQS',
  },
  {
    label: 'AWS STACK',
    value: 'AWS STACK',
  },
  {
    label: 'AZURE',
    value: 'AZURE',
  },
  {
    label: 'AZURE - CLOUD SERVICES',
    value: 'AZURE - CLOUD SERVICES',
  },
  {
    label: 'AZURE ACTIVE DIRECTORY',
    value: 'AZURE ACTIVE DIRECTORY',
  },
  {
    label: 'AZURE AD',
    value: 'AZURE AD',
  },
  {
    label: 'AZURE AD CONNECT',
    value: 'AZURE AD CONNECT',
  },
  {
    label: 'AZURE AD ENVIRONMENTS',
    value: 'AZURE AD ENVIRONMENTS',
  },
  {
    label: 'AZURE ADMIN ASSOCIATE',
    value: 'AZURE ADMIN ASSOCIATE',
  },
  {
    label: 'AZURE ADMINISTRATOR',
    value: 'AZURE ADMINISTRATOR',
  },
  {
    label: 'AZURE ADV',
    value: 'AZURE ADV',
  },
  {
    label: 'AZURE ANALYSIS SERVICES',
    value: 'AZURE ANALYSIS SERVICES',
  },
  {
    label: 'AZURE API MANAGEMENT',
    value: 'AZURE API MANAGEMENT',
  },
  {
    label: 'AZURE APP SERVICE',
    value: 'AZURE APP SERVICE',
  },
  {
    label: 'AZURE APPLICATION',
    value: 'AZURE APPLICATION',
  },
  {
    label: 'AZURE ARM TEMPLATES',
    value: 'AZURE ARM TEMPLATES',
  },
  {
    label: 'AZURE AUTOMATION',
    value: 'AZURE AUTOMATION',
  },
  {
    label: 'AZURE BATCH',
    value: 'AZURE BATCH',
  },
  {
    label: 'AZURE BLOB',
    value: 'AZURE BLOB',
  },
  {
    label: 'AZURE CLI',
    value: 'AZURE CLI',
  },
  {
    label: 'AZURE CLOUD',
    value: 'AZURE CLOUD',
  },
  {
    label: 'AZURE COMPUTE',
    value: 'AZURE COMPUTE',
  },
  {
    label: 'AZURE COSMOS DB',
    value: 'AZURE COSMOS DB',
  },
  {
    label: 'AZURE COSMOS DB (NOSQL)',
    value: 'AZURE COSMOS DB (NOSQL)',
  },
  {
    label: 'AZURE DATA & AI',
    value: 'AZURE DATA & AI',
  },
  {
    label: 'AZURE DATA CATALOG',
    value: 'AZURE DATA CATALOG',
  },
  {
    label: 'AZURE DATA CATALOGUE',
    value: 'AZURE DATA CATALOGUE',
  },
  {
    label: 'AZURE DATA FACTORY',
    value: 'AZURE DATA FACTORY',
  },
  {
    label: 'AZURE DATA LAKE',
    value: 'AZURE DATA LAKE',
  },
  {
    label: 'AZURE DATA MODELER',
    value: 'AZURE DATA MODELER',
  },
  {
    label: 'AZURE DATA PLATFORM',
    value: 'AZURE DATA PLATFORM',
  },
  {
    label: 'AZURE DATA SERVICES',
    value: 'AZURE DATA SERVICES',
  },
  {
    label: 'AZURE DATA STORAGE',
    value: 'AZURE DATA STORAGE',
  },
  {
    label: 'AZURE DATA STUDIO',
    value: 'AZURE DATA STUDIO',
  },
  {
    label: 'AZURE DATA WAREHOUSE',
    value: 'AZURE DATA WAREHOUSE',
  },
  {
    label: 'AZURE DATABRICKS',
    value: 'AZURE DATABRICKS',
  },
  {
    label: 'AZURE DEV OPS',
    value: 'AZURE DEV OPS',
  },
  {
    label: 'AZURE DEVELOPER SERVICES',
    value: 'AZURE DEVELOPER SERVICES',
  },
  {
    label: 'AZURE DEVOPS',
    value: 'AZURE DEVOPS',
  },
  {
    label: 'AZURE DEVOPS BOARDS',
    value: 'AZURE DEVOPS BOARDS',
  },
  {
    label: 'AZURE DEVOPS SERVICES (TFS)',
    value: 'AZURE DEVOPS SERVICES (TFS)',
  },
  {
    label: 'AZURE DNS',
    value: 'AZURE DNS',
  },
  {
    label: 'AZURE DOCUMENTDB',
    value: 'AZURE DOCUMENTDB',
  },
  {
    label: 'AZURE EVENT HUB',
    value: 'AZURE EVENT HUB',
  },
  {
    label: 'AZURE FUNCTIONS',
    value: 'AZURE FUNCTIONS',
  },
  {
    label: 'AZURE HDINSIGHT',
    value: 'AZURE HDINSIGHT',
  },
  {
    label: 'AZURE HDINSIGHTS',
    value: 'AZURE HDINSIGHTS',
  },
  {
    label: 'AZURE IAAS',
    value: 'AZURE IAAS',
  },
  {
    label: 'AZURE IDENTITY MANAGEMENT',
    value: 'AZURE IDENTITY MANAGEMENT',
  },
  {
    label: 'AZURE KAFKA',
    value: 'AZURE KAFKA',
  },
  {
    label: 'AZURE KUBERNETES',
    value: 'AZURE KUBERNETES',
  },
  {
    label: 'AZURE KUBERNETS SERVICE',
    value: 'AZURE KUBERNETS SERVICE',
  },
  {
    label: 'AZURE LOG ANALYTICS',
    value: 'AZURE LOG ANALYTICS',
  },
  {
    label: 'AZURE LOGIC APPS',
    value: 'AZURE LOGIC APPS',
  },
  {
    label: 'AZURE LUIS',
    value: 'AZURE LUIS',
  },
  {
    label: 'AZURE MACHINE LEARNING',
    value: 'AZURE MACHINE LEARNING',
  },
  {
    label: 'AZURE MACHINE LEARNING STUDIO',
    value: 'AZURE MACHINE LEARNING STUDIO',
  },
  {
    label: 'AZURE ML',
    value: 'AZURE ML',
  },
  {
    label: 'AZURE MONITOR',
    value: 'AZURE MONITOR',
  },
  {
    label: 'AZURE NETWORK',
    value: 'AZURE NETWORK',
  },
  {
    label: 'AZURE NOTIFICATION HUBS',
    value: 'AZURE NOTIFICATION HUBS',
  },
  {
    label: 'AZURE POWER PLATFORM',
    value: 'AZURE POWER PLATFORM',
  },
  {
    label: 'AZURE RESOURCE MANAGER',
    value: 'AZURE RESOURCE MANAGER',
  },
  {
    label: 'AZURE RP',
    value: 'AZURE RP',
  },
  {
    label: 'AZURE SAP',
    value: 'AZURE SAP',
  },
  {
    label: 'AZURE SEARCH',
    value: 'AZURE SEARCH',
  },
  {
    label: 'AZURE SENTINEL',
    value: 'AZURE SENTINEL',
  },
  {
    label: 'AZURE SERVER',
    value: 'AZURE SERVER',
  },
  {
    label: 'AZURE SERVICE',
    value: 'AZURE SERVICE',
  },
  {
    label: 'AZURE SERVICE BUS',
    value: 'AZURE SERVICE BUS',
  },
  {
    label: 'AZURE SERVICE FABRIC',
    value: 'AZURE SERVICE FABRIC',
  },
  {
    label: 'AZURE SQL',
    value: 'AZURE SQL',
  },
  {
    label: 'AZURE SQL DATA WAREHOUSE',
    value: 'AZURE SQL DATA WAREHOUSE',
  },
  {
    label: 'AZURE SQL DATABASE',
    value: 'AZURE SQL DATABASE',
  },
  {
    label: 'AZURE SQL DB',
    value: 'AZURE SQL DB',
  },
  {
    label: 'AZURE SQL DW',
    value: 'AZURE SQL DW',
  },
  {
    label: 'AZURE SQL DW/DI',
    value: 'AZURE SQL DW/DI',
  },
  {
    label: 'AZURE SQL WAREHOUSE',
    value: 'AZURE SQL WAREHOUSE',
  },
  {
    label: 'AZURE SSAS',
    value: 'AZURE SSAS',
  },
  {
    label: 'AZURE STACK',
    value: 'AZURE STACK',
  },
  {
    label: 'AZURE STACK EDGE',
    value: 'AZURE STACK EDGE',
  },
  {
    label: 'AZURE STORAGE',
    value: 'AZURE STORAGE',
  },
  {
    label: 'AZURE STREAM',
    value: 'AZURE STREAM',
  },
  {
    label: 'AZURE STREAM ANALYTICS',
    value: 'AZURE STREAM ANALYTICS',
  },
  {
    label: 'AZURE SYNAPSE',
    value: 'AZURE SYNAPSE',
  },
  {
    label: 'AZURE UPDATE MANAGEMENT',
    value: 'AZURE UPDATE MANAGEMENT',
  },
  {
    label: 'AZURE VIRTUAL DESKTOP',
    value: 'AZURE VIRTUAL DESKTOP',
  },
  {
    label: 'AZURESQL',
    value: 'AZURESQL',
  },
  {
    label: 'BABEL',
    value: 'BABEL',
  },
  {
    label: 'BABYLON.JS',
    value: 'BABYLON.JS',
  },
  {
    label: 'BACKBONE JS',
    value: 'BACKBONE JS',
  },
  {
    label: 'BAGGING & BOOSTING',
    value: 'BAGGING & BOOSTING',
  },
  {
    label: 'BAMBOO',
    value: 'BAMBOO',
  },
  {
    label: 'BASH',
    value: 'BASH',
  },
  {
    label: 'BASIC JAVA',
    value: 'BASIC JAVA',
  },
  {
    label: 'BATCH SCRIPT',
    value: 'BATCH SCRIPT',
  },
  {
    label: 'BAYESIAN',
    value: 'BAYESIAN',
  },
  {
    label: 'BAYESIAN HMM',
    value: 'BAYESIAN HMM',
  },
  {
    label: 'BAYESIAN INFERENCE',
    value: 'BAYESIAN INFERENCE',
  },
  {
    label: 'BAYESIAN MODEL',
    value: 'BAYESIAN MODEL',
  },
  {
    label: 'BAYESIAN NETWORKS',
    value: 'BAYESIAN NETWORKS',
  },
  {
    label: 'BAYESIAN STATISTICS',
    value: 'BAYESIAN STATISTICS',
  },
  {
    label: 'BD2 SERVER',
    value: 'BD2 SERVER',
  },
  {
    label: 'BEAN STALK',
    value: 'BEAN STALK',
  },
  {
    label: 'BEANSHELL',
    value: 'BEANSHELL',
  },
  {
    label: 'BEANSTALK',
    value: 'BEANSTALK',
  },
  {
    label: 'BEAUTIFULSOUP',
    value: 'BEAUTIFULSOUP',
  },
  {
    label: 'BEHAVIOURAL PREDICTION',
    value: 'BEHAVIOURAL PREDICTION',
  },
  {
    label: 'BEX ANALYZER',
    value: 'BEX ANALYZER',
  },
  {
    label: 'BI PUBLISHER',
    value: 'BI PUBLISHER',
  },
  {
    label: 'BIG DATA',
    value: 'BIG DATA',
  },
  {
    label: 'BIG DATA ANALYTICS',
    value: 'BIG DATA ANALYTICS',
  },
  {
    label: 'BIG DATA DISTRIBUTIONS',
    value: 'BIG DATA DISTRIBUTIONS',
  },
  {
    label: 'BIG DATA HADOOP',
    value: 'BIG DATA HADOOP',
  },
  {
    label: 'BIG QUERY',
    value: 'BIG QUERY',
  },
  {
    label: 'BIG SQL',
    value: 'BIG SQL',
  },
  {
    label: 'BIG-DATA',
    value: 'BIG-DATA',
  },
  {
    label: 'BIGFIX',
    value: 'BIGFIX',
  },
  {
    label: 'BIGPANDA',
    value: 'BIGPANDA',
  },
  {
    label: 'BIGQUERY',
    value: 'BIGQUERY',
  },
  {
    label: 'BIGTABLE',
    value: 'BIGTABLE',
  },
  {
    label: 'BIRCH AND SPECTRAL CLUSTERING',
    value: 'BIRCH AND SPECTRAL CLUSTERING',
  },
  {
    label: 'BIRST',
    value: 'BIRST',
  },
  {
    label: 'BIT BUCKET',
    value: 'BIT BUCKET',
  },
  {
    label: 'BIT BUCKET AWS',
    value: 'BIT BUCKET AWS',
  },
  {
    label: 'BLACK BOX TESTING',
    value: 'BLACK BOX TESTING',
  },
  {
    label: 'BLUEBREAM',
    value: 'BLUEBREAM',
  },
  {
    label: 'BLUEMIX',
    value: 'BLUEMIX',
  },
  {
    label: 'BLUEMIX WATSON',
    value: 'BLUEMIX WATSON',
  },
  {
    label: 'BOILERPLATE',
    value: 'BOILERPLATE',
  },
  {
    label: 'BOKEH',
    value: 'BOKEH',
  },
  {
    label: 'BOOSTING',
    value: 'BOOSTING',
  },
  {
    label: 'BOOSTING SVM',
    value: 'BOOSTING SVM',
  },
  {
    label: 'BOOTSTRAP',
    value: 'BOOTSTRAP',
  },
  {
    label: 'BOOTSTRAPPING',
    value: 'BOOTSTRAPPING',
  },
  {
    label: 'BOTTLE',
    value: 'BOTTLE',
  },
  {
    label: 'BOURNE SHELL',
    value: 'BOURNE SHELL',
  },
  {
    label: 'BPEL',
    value: 'BPEL',
  },
  {
    label: 'BRACKETS',
    value: 'BRACKETS',
  },
  {
    label: 'BSS/OSS',
    value: 'BSS/OSS',
  },
  {
    label: 'BTEQ',
    value: 'BTEQ',
  },
  {
    label: 'BUGZILLA',
    value: 'BUGZILLA',
  },
  {
    label: 'BURP',
    value: 'BURP',
  },
  {
    label: 'BURP SUITE',
    value: 'BURP SUITE',
  },
  {
    label: 'BURP SUITE PRO',
    value: 'BURP SUITE PRO',
  },
  {
    label: 'BURPSUITE',
    value: 'BURPSUITE',
  },
  {
    label: 'BUSINESS INTELLIGENCE DEVELOPMENT STUDIO (BIDS)',
    value: 'BUSINESS INTELLIGENCE DEVELOPMENT STUDIO (BIDS)',
  },
  {
    label: 'BUSINESS OBJECTS',
    value: 'BUSINESS OBJECTS',
  },
  {
    label: 'BW/BI',
    value: 'BW/BI',
  },
  {
    label: 'C',
    value: 'C',
  },
  {
    label: 'C PROGRAMMING',
    value: 'C PROGRAMMING',
  },
  {
    label: 'C SHARP',
    value: 'C SHARP',
  },
  {
    label: 'C SHELL',
    value: 'C SHELL',
  },
  {
    label: 'C#',
    value: 'C#',
  },
  {
    label: 'C# .NET',
    value: 'C# .NET',
  },
  {
    label: 'C# .NET CORE',
    value: 'C# .NET CORE',
  },
  {
    label: 'C#.NET',
    value: 'C#.NET',
  },
  {
    label: 'C++',
    value: 'C++',
  },
  {
    label: 'CA AUTOSYS',
    value: 'CA AUTOSYS',
  },
  {
    label: 'CA DATA MANAGER',
    value: 'CA DATA MANAGER',
  },
  {
    label: 'CA ERWIN',
    value: 'CA ERWIN',
  },
  {
    label: 'CA LISA',
    value: 'CA LISA',
  },
  {
    label: 'CA WILY',
    value: 'CA WILY',
  },
  {
    label: 'CACTI',
    value: 'CACTI',
  },
  {
    label: 'CAFFE',
    value: 'CAFFE',
  },
  {
    label: 'CAKEPHP',
    value: 'CAKEPHP',
  },
  {
    label: 'CANTATA',
    value: 'CANTATA',
  },
  {
    label: 'CAPEX',
    value: 'CAPEX',
  },
  {
    label: 'CARET',
    value: 'CARET',
  },
  {
    label: 'CAROUSEL',
    value: 'CAROUSEL',
  },
  {
    label: 'CASSANDRA',
    value: 'CASSANDRA',
  },
  {
    label: 'CASSANDRA DATA MODELLING',
    value: 'CASSANDRA DATA MODELLING',
  },
  {
    label: 'CATBOOST',
    value: 'CATBOOST',
  },
  {
    label: 'CATIA',
    value: 'CATIA',
  },
  {
    label: 'CATTSCRIPTS',
    value: 'CATTSCRIPTS',
  },
  {
    label: 'CAWI',
    value: 'CAWI',
  },
  {
    label: 'CCNA',
    value: 'CCNA',
  },
  {
    label: 'CCNP',
    value: 'CCNP',
  },
  {
    label: 'CD PIPELINES',
    value: 'CD PIPELINES',
  },
  {
    label: 'CDH',
    value: 'CDH',
  },
  {
    label: 'CDH HIVE',
    value: 'CDH HIVE',
  },
  {
    label: 'CDOEXM',
    value: 'CDOEXM',
  },
  {
    label: 'CENTOS',
    value: 'CENTOS',
  },
  {
    label: 'CENTRAL LDAP',
    value: 'CENTRAL LDAP',
  },
  {
    label: 'CENTRIFY',
    value: 'CENTRIFY',
  },
  {
    label: 'CENTRIFY SERVER SUITE',
    value: 'CENTRIFY SERVER SUITE',
  },
  {
    label: 'CFP',
    value: 'CFP',
  },
  {
    label: 'CHAOS MONKEY',
    value: 'CHAOS MONKEY',
  },
  {
    label: 'CHARLES',
    value: 'CHARLES',
  },
  {
    label: 'CHARLES PROXY',
    value: 'CHARLES PROXY',
  },
  {
    label: 'CHARTIO',
    value: 'CHARTIO',
  },
  {
    label: 'CHATBOTS',
    value: 'CHATBOTS',
  },
  {
    label: 'CHEF',
    value: 'CHEF',
  },
  {
    label: 'CHERRYPY',
    value: 'CHERRYPY',
  },
  {
    label: 'CHI SQUARE TEST',
    value: 'CHI SQUARE TEST',
  },
  {
    label: 'CHIP VALIDATION',
    value: 'CHIP VALIDATION',
  },
  {
    label: 'CHI-SQUARE',
    value: 'CHI-SQUARE',
  },
  {
    label: 'CHI-SQURE',
    value: 'CHI-SQURE',
  },
  {
    label: 'CHRONOGRAF',
    value: 'CHRONOGRAF',
  },
  {
    label: 'CHURN ANALYSIS',
    value: 'CHURN ANALYSIS',
  },
  {
    label: 'CI DESIGN',
    value: 'CI DESIGN',
  },
  {
    label: 'CI/CD SERVERS',
    value: 'CI/CD SERVERS',
  },
  {
    label: 'CI/CD/BUILD',
    value: 'CI/CD/BUILD',
  },
  {
    label: 'CICD',
    value: 'CICD',
  },
  {
    label: 'CITRIX',
    value: 'CITRIX',
  },
  {
    label: 'CITRIX XENAPP',
    value: 'CITRIX XENAPP',
  },
  {
    label: 'CLASSIFICATION',
    value: 'CLASSIFICATION',
  },
  {
    label: 'CLASSIFICATION & CLUSTERING',
    value: 'CLASSIFICATION & CLUSTERING',
  },
  {
    label: 'CLASSIFICATION AND REGRESSION ANALYSIS',
    value: 'CLASSIFICATION AND REGRESSION ANALYSIS',
  },
  {
    label: 'CLASSIFICATION LOGISTIC REGRESSION',
    value: 'CLASSIFICATION LOGISTIC REGRESSION',
  },
  {
    label: 'CLASSIFICATION REPORT',
    value: 'CLASSIFICATION REPORT',
  },
  {
    label: 'CLASSIFIERS',
    value: 'CLASSIFIERS',
  },
  {
    label: 'CLIENT-SERVER ARCHITECTURE',
    value: 'CLIENT-SERVER ARCHITECTURE',
  },
  {
    label: 'CLOUD AI',
    value: 'CLOUD AI',
  },
  {
    label: 'CLOUD AWS/OPENSTACK',
    value: 'CLOUD AWS/OPENSTACK',
  },
  {
    label: 'CLOUD COMPOSER',
    value: 'CLOUD COMPOSER',
  },
  {
    label: 'CLOUD COMPUTING',
    value: 'CLOUD COMPUTING',
  },
  {
    label: 'CLOUD COMPUTING SERVICES',
    value: 'CLOUD COMPUTING SERVICES',
  },
  {
    label: 'CLOUD COMPUTINGSTRONG SENSE',
    value: 'CLOUD COMPUTINGSTRONG SENSE',
  },
  {
    label: 'CLOUD CONNECTOR',
    value: 'CLOUD CONNECTOR',
  },
  {
    label: 'CLOUD DATA FUSION',
    value: 'CLOUD DATA FUSION',
  },
  {
    label: 'CLOUD DATA WAREHOUSE',
    value: 'CLOUD DATA WAREHOUSE',
  },
  {
    label: 'CLOUD DATAFLOW',
    value: 'CLOUD DATAFLOW',
  },
  {
    label: 'CLOUD DATAPROC',
    value: 'CLOUD DATAPROC',
  },
  {
    label: 'CLOUD DATASTORE',
    value: 'CLOUD DATASTORE',
  },
  {
    label: 'CLOUD DNS',
    value: 'CLOUD DNS',
  },
  {
    label: 'CLOUD FORMATION',
    value: 'CLOUD FORMATION',
  },
  {
    label: 'CLOUD FOUNDRY',
    value: 'CLOUD FOUNDRY',
  },
  {
    label: 'CLOUD FRONT',
    value: 'CLOUD FRONT',
  },
  {
    label: 'CLOUD METADATA GROUP',
    value: 'CLOUD METADATA GROUP',
  },
  {
    label: 'CLOUD ML',
    value: 'CLOUD ML',
  },
  {
    label: 'CLOUD NATIVE',
    value: 'CLOUD NATIVE',
  },
  {
    label: 'CLOUD PUB/SUB',
    value: 'CLOUD PUB/SUB',
  },
  {
    label: 'CLOUD SECURITY',
    value: 'CLOUD SECURITY',
  },
  {
    label: 'CLOUD SECURITY ALLIANCE CLOUD CONTROLS MATRIX',
    value: 'CLOUD SECURITY ALLIANCE CLOUD CONTROLS MATRIX',
  },
  {
    label: 'CLOUD SECURITY-L3',
    value: 'CLOUD SECURITY-L3',
  },
  {
    label: 'CLOUD SERVICE AUTOMATION',
    value: 'CLOUD SERVICE AUTOMATION',
  },
  {
    label: 'CLOUD SERVICES',
    value: 'CLOUD SERVICES',
  },
  {
    label: 'CLOUD SYSTEMS',
    value: 'CLOUD SYSTEMS',
  },
  {
    label: 'CLOUD TESTING',
    value: 'CLOUD TESTING',
  },
  {
    label: 'CLOUD TRAIL',
    value: 'CLOUD TRAIL',
  },
  {
    label: 'CLOUD WATCH',
    value: 'CLOUD WATCH',
  },
  {
    label: 'CLOUDBASE',
    value: 'CLOUDBASE',
  },
  {
    label: 'CLOUDBEES',
    value: 'CLOUDBEES',
  },
  {
    label: 'CLOUDERA',
    value: 'CLOUDERA',
  },
  {
    label: 'CLOUDERA ENTERPRISE',
    value: 'CLOUDERA ENTERPRISE',
  },
  {
    label: 'CLOUDERA HADOOP',
    value: 'CLOUDERA HADOOP',
  },
  {
    label: 'CLOUDERA VM DISTRIBUTION',
    value: 'CLOUDERA VM DISTRIBUTION',
  },
  {
    label: 'CLOUDERAS CDH DISTRIBUTION',
    value: 'CLOUDERAS CDH DISTRIBUTION',
  },
  {
    label: 'CLOUDFORMATION',
    value: 'CLOUDFORMATION',
  },
  {
    label: 'CLOUDFORMATIONTOP',
    value: 'CLOUDFORMATIONTOP',
  },
  {
    label: 'CLOUDFOUNDRY',
    value: 'CLOUDFOUNDRY',
  },
  {
    label: 'CLOUDFRONT',
    value: 'CLOUDFRONT',
  },
  {
    label: 'CLOUDSQL',
    value: 'CLOUDSQL',
  },
  {
    label: 'CLOUDSTACK',
    value: 'CLOUDSTACK',
  },
  {
    label: 'CLS',
    value: 'CLS',
  },
  {
    label: 'CLUSTER ANALYSIS',
    value: 'CLUSTER ANALYSIS',
  },
  {
    label: 'CLUSTERING',
    value: 'CLUSTERING',
  },
  {
    label: 'CLUSTERING AND MACHINE LEARNING',
    value: 'CLUSTERING AND MACHINE LEARNING',
  },
  {
    label: 'CMMC',
    value: 'CMMC',
  },
  {
    label: 'CNAME',
    value: 'CNAME',
  },
  {
    label: 'CNN',
    value: 'CNN',
  },
  {
    label: 'CNTK',
    value: 'CNTK',
  },
  {
    label: 'COBOL',
    value: 'COBOL',
  },
  {
    label: 'COCKROACH DB',
    value: 'COCKROACH DB',
  },
  {
    label: 'COCOA',
    value: 'COCOA',
  },
  {
    label: 'COGNOS',
    value: 'COGNOS',
  },
  {
    label: 'COGNOS BI',
    value: 'COGNOS BI',
  },
  {
    label: 'COGNOS BI 10',
    value: 'COGNOS BI 10',
  },
  {
    label: 'COGNOS REPORT STUDIO',
    value: 'COGNOS REPORT STUDIO',
  },
  {
    label: 'COGNOS SCI',
    value: 'COGNOS SCI',
  },
  {
    label: 'COLDFUSION',
    value: 'COLDFUSION',
  },
  {
    label: 'COLLABORATIVE FILTERS',
    value: 'COLLABORATIVE FILTERS',
  },
  {
    label: 'COLLABORATIVE PROBLEM SOLVING',
    value: 'COLLABORATIVE PROBLEM SOLVING',
  },
  {
    label: 'COLLIBRA',
    value: 'COLLIBRA',
  },
  {
    label: 'COMPONENT ANALYSIS',
    value: 'COMPONENT ANALYSIS',
  },
  {
    label: 'COMPUTER VISION',
    value: 'COMPUTER VISION',
  },
  {
    label: 'CONDA',
    value: 'CONDA',
  },
  {
    label: 'CONFIDENCE INTERVALS',
    value: 'CONFIDENCE INTERVALS',
  },
  {
    label: 'CONFLUENCE',
    value: 'CONFLUENCE',
  },
  {
    label: 'CONFUSION-MATRIX',
    value: 'CONFUSION-MATRIX',
  },
  {
    label: 'CONTAINERIZATION',
    value: 'CONTAINERIZATION',
  },
  {
    label: 'CONTINUOUS DELIVERY',
    value: 'CONTINUOUS DELIVERY',
  },
  {
    label: 'CONTINUOUS DEPLOYMENT',
    value: 'CONTINUOUS DEPLOYMENT',
  },
  {
    label: 'CONTINUOUS INTEGRATION',
    value: 'CONTINUOUS INTEGRATION',
  },
  {
    label: 'CONTROL M',
    value: 'CONTROL M',
  },
  {
    label: 'CONTROL-M',
    value: 'CONTROL-M',
  },
  {
    label: 'CONVOLUTIONAL NEURAL NETWORK',
    value: 'CONVOLUTIONAL NEURAL NETWORK',
  },
  {
    label: 'CONVOLUTIONAL NEURAL NETWORKS',
    value: 'CONVOLUTIONAL NEURAL NETWORKS',
  },
  {
    label: 'CORDOVA',
    value: 'CORDOVA',
  },
  {
    label: 'CORE CONNECTORS',
    value: 'CORE CONNECTORS',
  },
  {
    label: 'CORE JAVA',
    value: 'CORE JAVA',
  },
  {
    label: 'CORE JAVA (ANDROID & IOS)',
    value: 'CORE JAVA (ANDROID & IOS)',
  },
  {
    label: 'COREL DRAW',
    value: 'COREL DRAW',
  },
  {
    label: 'CORONA SDK',
    value: 'CORONA SDK',
  },
  {
    label: 'CORRELATION',
    value: 'CORRELATION',
  },
  {
    label: 'COSINE SIMILARITY',
    value: 'COSINE SIMILARITY',
  },
  {
    label: 'COSMOS DB',
    value: 'COSMOS DB',
  },
  {
    label: 'CREUNA PLATFORM',
    value: 'CREUNA PLATFORM',
  },
  {
    label: 'CRONACLE',
    value: 'CRONACLE',
  },
  {
    label: 'CRONTAB',
    value: 'CRONTAB',
  },
  {
    label: 'CROSSVALIDATION MODELS',
    value: 'CROSSVALIDATION MODELS',
  },
  {
    label: 'CRYSTAL REPORTS',
    value: 'CRYSTAL REPORTS',
  },
  {
    label: 'CRYSTAL REPORTS XI',
    value: 'CRYSTAL REPORTS XI',
  },
  {
    label: 'CSLQ .NET',
    value: 'CSLQ .NET',
  },
  {
    label: 'CSS',
    value: 'CSS',
  },
  {
    label: 'CSS/CSS3',
    value: 'CSS/CSS3',
  },
  {
    label: 'CSS3',
    value: 'CSS3',
  },
  {
    label: 'CSS3 JSON',
    value: 'CSS3 JSON',
  },
  {
    label: 'C-SUITE',
    value: 'C-SUITE',
  },
  {
    label: 'C-SUITE EXECUTIVES',
    value: 'C-SUITE EXECUTIVES',
  },
  {
    label: 'CUBICWEB',
    value: 'CUBICWEB',
  },
  {
    label: 'CUCUMBER',
    value: 'CUCUMBER',
  },
  {
    label: 'CUCUMBER FRAMEWORK',
    value: 'CUCUMBER FRAMEWORK',
  },
  {
    label: 'CUCUMBER JS',
    value: 'CUCUMBER JS',
  },
  {
    label: 'CUDA',
    value: 'CUDA',
  },
  {
    label: 'CUDNN',
    value: 'CUDNN',
  },
  {
    label: 'CURSORS',
    value: 'CURSORS',
  },
  {
    label: 'CYPHER',
    value: 'CYPHER',
  },
  {
    label: 'D3.JS',
    value: 'D3.JS',
  },
  {
    label: 'DAGGER',
    value: 'DAGGER',
  },
  {
    label: 'DAGSTER',
    value: 'DAGSTER',
  },
  {
    label: 'DAO DESIGN',
    value: 'DAO DESIGN',
  },
  {
    label: 'DAPPER',
    value: 'DAPPER',
  },
  {
    label: 'DARKNET',
    value: 'DARKNET',
  },
  {
    label: 'DASH',
    value: 'DASH',
  },
  {
    label: 'DASH/POWERBI',
    value: 'DASH/POWERBI',
  },
  {
    label: 'DASK',
    value: 'DASK',
  },
  {
    label: 'DAST',
    value: 'DAST',
  },
  {
    label: 'DAT STAGE HADOOP',
    value: 'DAT STAGE HADOOP',
  },
  {
    label: 'DATA ADAPTER',
    value: 'DATA ADAPTER',
  },
  {
    label: 'DATA AGGREGATION',
    value: 'DATA AGGREGATION',
  },
  {
    label: 'DATA ANALYSIS',
    value: 'DATA ANALYSIS',
  },
  {
    label: 'DATA BLENDING',
    value: 'DATA BLENDING',
  },
  {
    label: 'DATA BRICKS',
    value: 'DATA BRICKS',
  },
  {
    label: 'DATA CATALOG',
    value: 'DATA CATALOG',
  },
  {
    label: 'DATA CLEANING',
    value: 'DATA CLEANING',
  },
  {
    label: 'DATA CREATION',
    value: 'DATA CREATION',
  },
  {
    label: 'DATA EXPLORATION',
    value: 'DATA EXPLORATION',
  },
  {
    label: 'DATA EXTRACT API',
    value: 'DATA EXTRACT API',
  },
  {
    label: 'DATA EXTRACTION',
    value: 'DATA EXTRACTION',
  },
  {
    label: 'DATA FABRIC',
    value: 'DATA FABRIC',
  },
  {
    label: 'DATA FLOW',
    value: 'DATA FLOW',
  },
  {
    label: 'DATA FRAMES',
    value: 'DATA FRAMES',
  },
  {
    label: 'DATA GOVERNANCE',
    value: 'DATA GOVERNANCE',
  },
  {
    label: 'DATA LAKE',
    value: 'DATA LAKE',
  },
  {
    label: 'DATA LAKE FORMATION',
    value: 'DATA LAKE FORMATION',
  },
  {
    label: 'DATA LIST',
    value: 'DATA LIST',
  },
  {
    label: 'DATA LOADER',
    value: 'DATA LOADER',
  },
  {
    label: 'DATA MANAGEMENT GATEWAY',
    value: 'DATA MANAGEMENT GATEWAY',
  },
  {
    label: 'DATA MANIPULATION',
    value: 'DATA MANIPULATION',
  },
  {
    label: 'DATA MANIPULATION & VISUALIZATION',
    value: 'DATA MANIPULATION & VISUALIZATION',
  },
  {
    label: 'DATA MARTS',
    value: 'DATA MARTS',
  },
  {
    label: 'DATA MIGRATION',
    value: 'DATA MIGRATION',
  },
  {
    label: 'DATA MINING',
    value: 'DATA MINING',
  },
  {
    label: 'DATA NODE',
    value: 'DATA NODE',
  },
  {
    label: 'DATA PREPARATION',
    value: 'DATA PREPARATION',
  },
  {
    label: 'DATA PROCESSING',
    value: 'DATA PROCESSING',
  },
  {
    label: 'DATA READER',
    value: 'DATA READER',
  },
  {
    label: 'DATA SCRAPING',
    value: 'DATA SCRAPING',
  },
  {
    label: 'DATA SERVER MANAGER',
    value: 'DATA SERVER MANAGER',
  },
  {
    label: 'DATA STRUCTURE',
    value: 'DATA STRUCTURE',
  },
  {
    label: 'DATA STRUCTURES',
    value: 'DATA STRUCTURES',
  },
  {
    label: 'DATA STUDIO',
    value: 'DATA STUDIO',
  },
  {
    label: 'DATA TRANSFORMATION',
    value: 'DATA TRANSFORMATION',
  },
  {
    label: 'DATA TRANSFORMATION SERVICES',
    value: 'DATA TRANSFORMATION SERVICES',
  },
  {
    label: 'DATA VALIDATION',
    value: 'DATA VALIDATION',
  },
  {
    label: 'DATA VIRTUALIZATION',
    value: 'DATA VIRTUALIZATION',
  },
  {
    label: 'DATA VISUALIZATION',
    value: 'DATA VISUALIZATION',
  },
  {
    label: 'DATA WAREHOUSE',
    value: 'DATA WAREHOUSE',
  },
  {
    label: 'DATA WAREHOUSING',
    value: 'DATA WAREHOUSING',
  },
  {
    label: 'DATABASE ADMINISTRATION',
    value: 'DATABASE ADMINISTRATION',
  },
  {
    label: 'DATABASE DESIGN',
    value: 'DATABASE DESIGN',
  },
  {
    label: 'DATABASE MIGRATION',
    value: 'DATABASE MIGRATION',
  },
  {
    label: 'DATABASE MODEL',
    value: 'DATABASE MODEL',
  },
  {
    label: 'DATABASE PERFORMANCE',
    value: 'DATABASE PERFORMANCE',
  },
  {
    label: 'DATABASE REPLICATION',
    value: 'DATABASE REPLICATION',
  },
  {
    label: 'DATAMART',
    value: 'DATAMART',
  },
  {
    label: 'DATASTAGE',
    value: 'DATASTAGE',
  },
  {
    label: 'DATASTAGE DESIGNER',
    value: 'DATASTAGE DESIGNER',
  },
  {
    label: 'DATASWARM',
    value: 'DATASWARM',
  },
  {
    label: 'DATE FUNCTION',
    value: 'DATE FUNCTION',
  },
  {
    label: 'DATE RANGE',
    value: 'DATE RANGE',
  },
  {
    label: 'DAX',
    value: 'DAX',
  },
  {
    label: 'DB TESTING',
    value: 'DB TESTING',
  },
  {
    label: 'DB2',
    value: 'DB2',
  },
  {
    label: 'DB2 SQL',
    value: 'DB2 SQL',
  },
  {
    label: 'DB2/400',
    value: 'DB2/400',
  },
  {
    label: 'DBA',
    value: 'DBA',
  },
  {
    label: 'DBASE',
    value: 'DBASE',
  },
  {
    label: 'DBEAVER',
    value: 'DBEAVER',
  },
  {
    label: 'DBMS',
    value: 'DBMS',
  },
  {
    label: 'DBSCAN',
    value: 'DBSCAN',
  },
  {
    label: 'DDB',
    value: 'DDB',
  },
  {
    label: 'DDD',
    value: 'DDD',
  },
  {
    label: 'DDL',
    value: 'DDL',
  },
  {
    label: 'DDL & DML',
    value: 'DDL & DML',
  },
  {
    label: 'DDL OPERATIONS',
    value: 'DDL OPERATIONS',
  },
  {
    label: 'DDL SCRIPT',
    value: 'DDL SCRIPT',
  },
  {
    label: 'DEBEZIUM',
    value: 'DEBEZIUM',
  },
  {
    label: 'DEBIAN',
    value: 'DEBIAN',
  },
  {
    label: 'DECISION ANALYTICS',
    value: 'DECISION ANALYTICS',
  },
  {
    label: 'DECISION TREE',
    value: 'DECISION TREE',
  },
  {
    label: 'DECISION TREE ENSEMBLES',
    value: 'DECISION TREE ENSEMBLES',
  },
  {
    label: 'DEEP LEARNING',
    value: 'DEEP LEARNING',
  },
  {
    label: 'DEEP NEURAL NETWORK',
    value: 'DEEP NEURAL NETWORK',
  },
  {
    label: 'DEEP REINFORCEMENT LEARNING(DRQN)',
    value: 'DEEP REINFORCEMENT LEARNING(DRQN)',
  },
  {
    label: 'DENODO',
    value: 'DENODO',
  },
  {
    label: 'DEPLOYMENT',
    value: 'DEPLOYMENT',
  },
  {
    label: 'DESCRIPTIVE ANALYTICS',
    value: 'DESCRIPTIVE ANALYTICS',
  },
  {
    label: 'DESCRIPTIVE AND PREDICTIVE STATISTICS',
    value: 'DESCRIPTIVE AND PREDICTIVE STATISTICS',
  },
  {
    label: 'DESCRIPTIVE STATISTICS',
    value: 'DESCRIPTIVE STATISTICS',
  },
  {
    label: 'DEVOPS/AWS',
    value: 'DEVOPS/AWS',
  },
  {
    label: 'DHTML',
    value: 'DHTML',
  },
  {
    label: 'DIGITAL ANALYTICS',
    value: 'DIGITAL ANALYTICS',
  },
  {
    label: 'DIGITAL CARTOGRAPHIC STUDIO (DCS)',
    value: 'DIGITAL CARTOGRAPHIC STUDIO (DCS)',
  },
  {
    label: 'DIMENSIONALITY REDUCTION',
    value: 'DIMENSIONALITY REDUCTION',
  },
  {
    label: 'DIMENSIONALITY-REDUCTION',
    value: 'DIMENSIONALITY-REDUCTION',
  },
  {
    label: 'DISTRIBUTED COMPUTING',
    value: 'DISTRIBUTED COMPUTING',
  },
  {
    label: 'DISTRIBUTED SYSTEMS',
    value: 'DISTRIBUTED SYSTEMS',
  },
  {
    label: 'DISTRIBUTION DATA',
    value: 'DISTRIBUTION DATA',
  },
  {
    label: 'DIVMOD NEVOW',
    value: 'DIVMOD NEVOW',
  },
  {
    label: 'DJANGO',
    value: 'DJANGO',
  },
  {
    label: 'DJANGO WEB FRAMEWORK',
    value: 'DJANGO WEB FRAMEWORK',
  },
  {
    label: 'DL4J',
    value: 'DL4J',
  },
  {
    label: 'DLATK',
    value: 'DLATK',
  },
  {
    label: 'DML',
    value: 'DML',
  },
  {
    label: 'DMLS',
    value: 'DMLS',
  },
  {
    label: 'DNN',
    value: 'DNN',
  },
  {
    label: 'DNS',
    value: 'DNS',
  },
  {
    label: 'DOCKER',
    value: 'DOCKER',
  },
  {
    label: 'DOCKER CONTAINER',
    value: 'DOCKER CONTAINER',
  },
  {
    label: 'DOCKER CONTAINERIZATION',
    value: 'DOCKER CONTAINERIZATION',
  },
  {
    label: 'DOCKER CONTAINERS',
    value: 'DOCKER CONTAINERS',
  },
  {
    label: 'DOCKER DATA CENTER/SWARM',
    value: 'DOCKER DATA CENTER/SWARM',
  },
  {
    label: 'DOCKER DESIGN',
    value: 'DOCKER DESIGN',
  },
  {
    label: 'DOCKER ENGINE',
    value: 'DOCKER ENGINE',
  },
  {
    label: 'DOCKER HUB',
    value: 'DOCKER HUB',
  },
  {
    label: 'DOCKER OS',
    value: 'DOCKER OS',
  },
  {
    label: 'DOCKER REGISTRY',
    value: 'DOCKER REGISTRY',
  },
  {
    label: 'DOCKER SWARM',
    value: 'DOCKER SWARM',
  },
  {
    label: 'DOCKER SWARM/MESOS',
    value: 'DOCKER SWARM/MESOS',
  },
  {
    label: 'DOCKET',
    value: 'DOCKET',
  },
  {
    label: 'DODAF',
    value: 'DODAF',
  },
  {
    label: 'DOJO',
    value: 'DOJO',
  },
  {
    label: 'DPLYR',
    value: 'DPLYR',
  },
  {
    label: 'DROOLS',
    value: 'DROOLS',
  },
  {
    label: 'DROPWIZARD',
    value: 'DROPWIZARD',
  },
  {
    label: 'DRUPAL',
    value: 'DRUPAL',
  },
  {
    label: 'DSE CASSANDRA DATABASE',
    value: 'DSE CASSANDRA DATABASE',
  },
  {
    label: 'DSS',
    value: 'DSS',
  },
  {
    label: 'DTCC',
    value: 'DTCC',
  },
  {
    label: 'DTS',
    value: 'DTS',
  },
  {
    label: 'DYNAMIC PROGRAMMING',
    value: 'DYNAMIC PROGRAMMING',
  },
  {
    label: 'DYNAMIC SQL',
    value: 'DYNAMIC SQL',
  },
  {
    label: 'DYNAMICS',
    value: 'DYNAMICS',
  },
  {
    label: 'DYNAMO DB',
    value: 'DYNAMO DB',
  },
  {
    label: 'EASYMOCK',
    value: 'EASYMOCK',
  },
  {
    label: 'EBEAN',
    value: 'EBEAN',
  },
  {
    label: 'EBI',
    value: 'EBI',
  },
  {
    label: 'EBS',
    value: 'EBS',
  },
  {
    label: 'ECLAT',
    value: 'ECLAT',
  },
  {
    label: 'ECLIPSE',
    value: 'ECLIPSE',
  },
  {
    label: 'ECLIPSE IDE',
    value: 'ECLIPSE IDE',
  },
  {
    label: 'ECLIPSE PLUGIN DEVELOPMENT',
    value: 'ECLIPSE PLUGIN DEVELOPMENT',
  },
  {
    label: 'ECLIPSEIDE',
    value: 'ECLIPSEIDE',
  },
  {
    label: 'ECS',
    value: 'ECS',
  },
  {
    label: 'EDL',
    value: 'EDL',
  },
  {
    label: 'EDM',
    value: 'EDM',
  },
  {
    label: 'EDW',
    value: 'EDW',
  },
  {
    label: 'EFK',
    value: 'EFK',
  },
  {
    label: 'EFS',
    value: 'EFS',
  },
  {
    label: 'EHR',
    value: 'EHR',
  },
  {
    label: 'EHR DATABASE MODELS',
    value: 'EHR DATABASE MODELS',
  },
  {
    label: 'EIGEN',
    value: 'EIGEN',
  },
  {
    label: 'EIGRP',
    value: 'EIGRP',
  },
  {
    label: 'EIGRP OSPF',
    value: 'EIGRP OSPF',
  },
  {
    label: 'EIGRP/OSPF',
    value: 'EIGRP/OSPF',
  },
  {
    label: 'EIM',
    value: 'EIM',
  },
  {
    label: 'EINSTEIN ANALYTICS',
    value: 'EINSTEIN ANALYTICS',
  },
  {
    label: 'EJB',
    value: 'EJB',
  },
  {
    label: 'EKS',
    value: 'EKS',
  },
  {
    label: 'ELASTIC',
    value: 'ELASTIC',
  },
  {
    label: 'ELASTIC BEANSTALK',
    value: 'ELASTIC BEANSTALK',
  },
  {
    label: 'ELASTIC BLOCK STORAGE',
    value: 'ELASTIC BLOCK STORAGE',
  },
  {
    label: 'ELASTIC CACHE',
    value: 'ELASTIC CACHE',
  },
  {
    label: 'ELASTIC FILE SHARING',
    value: 'ELASTIC FILE SHARING',
  },
  {
    label: 'ELASTIC FILESYSTEM',
    value: 'ELASTIC FILESYSTEM',
  },
  {
    label: 'ELASTIC LOAD',
    value: 'ELASTIC LOAD',
  },
  {
    label: 'ELASTIC LOAD-BALANCERS',
    value: 'ELASTIC LOAD-BALANCERS',
  },
  {
    label: 'ELASTIC MAP REDUCE',
    value: 'ELASTIC MAP REDUCE',
  },
  {
    label: 'ELASTIC MAPREDUCE',
    value: 'ELASTIC MAPREDUCE',
  },
  {
    label: 'ELASTIC NET',
    value: 'ELASTIC NET',
  },
  {
    label: 'ELASTIC SEARCH',
    value: 'ELASTIC SEARCH',
  },
  {
    label: 'ELASTIC SEARCH/ SOLR',
    value: 'ELASTIC SEARCH/ SOLR',
  },
  {
    label: 'ELASTIC STACK/ESAAS',
    value: 'ELASTIC STACK/ESAAS',
  },
  {
    label: 'ELASTICACHE',
    value: 'ELASTICACHE',
  },
  {
    label: 'ELASTICSEARCH',
    value: 'ELASTICSEARCH',
  },
  {
    label: 'ELB',
    value: 'ELB',
  },
  {
    label: 'ELB ROUTE 53',
    value: 'ELB ROUTE 53',
  },
  {
    label: 'ELB/ALB',
    value: 'ELB/ALB',
  },
  {
    label: 'ELBS',
    value: 'ELBS',
  },
  {
    label: 'ELIXIR',
    value: 'ELIXIR',
  },
  {
    label: 'ELK STACK',
    value: 'ELK STACK',
  },
  {
    label: 'ELK STACKS',
    value: 'ELK STACKS',
  },
  {
    label: 'ELT',
    value: 'ELT',
  },
  {
    label: 'ELTA MD',
    value: 'ELTA MD',
  },
  {
    label: 'EMBEDDED C',
    value: 'EMBEDDED C',
  },
  {
    label: 'EMBEDDED SYSTEMS',
    value: 'EMBEDDED SYSTEMS',
  },
  {
    label: 'EMC',
    value: 'EMC',
  },
  {
    label: 'EMC MIRRORVIEW',
    value: 'EMC MIRRORVIEW',
  },
  {
    label: 'EMC SANCOPY',
    value: 'EMC SANCOPY',
  },
  {
    label: 'EMC SNAPSURE',
    value: 'EMC SNAPSURE',
  },
  {
    label: 'EMGU CV',
    value: 'EMGU CV',
  },
  {
    label: 'EMPOWER VMWARE',
    value: 'EMPOWER VMWARE',
  },
  {
    label: 'EMR & ATHENA',
    value: 'EMR & ATHENA',
  },
  {
    label: 'ENCASE',
    value: 'ENCASE',
  },
  {
    label: 'ENCOG',
    value: 'ENCOG',
  },
  {
    label: 'ENCOUNTER DATA MANAGEMENT (EDM) SYSTEMS',
    value: 'ENCOUNTER DATA MANAGEMENT (EDM) SYSTEMS',
  },
  {
    label: 'ENSCOS',
    value: 'ENSCOS',
  },
  {
    label: 'ENSEMBLE LEARNING',
    value: 'ENSEMBLE LEARNING',
  },
  {
    label: 'ENSEMBLE METHODS',
    value: 'ENSEMBLE METHODS',
  },
  {
    label: 'ENSEMBLE MODELS',
    value: 'ENSEMBLE MODELS',
  },
  {
    label: 'ENSEMBLES',
    value: 'ENSEMBLES',
  },
  {
    label: 'ENSEMBLES RANDOM FOREST',
    value: 'ENSEMBLES RANDOM FOREST',
  },
  {
    label: 'ENTERPRISE ANALYSIS',
    value: 'ENTERPRISE ANALYSIS',
  },
  {
    label: 'ENTERPRISE APPLICATIONS',
    value: 'ENTERPRISE APPLICATIONS',
  },
  {
    label: 'ENTERPRISE ARCHITECT',
    value: 'ENTERPRISE ARCHITECT',
  },
  {
    label: 'ENTERPRISE ARCHITECTURE',
    value: 'ENTERPRISE ARCHITECTURE',
  },
  {
    label: 'ENTERPRISE DATA WAREHOUSE',
    value: 'ENTERPRISE DATA WAREHOUSE',
  },
  {
    label: 'ENTERPRISE GOVERNANCE',
    value: 'ENTERPRISE GOVERNANCE',
  },
  {
    label: 'ENTERPRISE GUIDE',
    value: 'ENTERPRISE GUIDE',
  },
  {
    label: 'ENTERPRISE INFORMATION',
    value: 'ENTERPRISE INFORMATION',
  },
  {
    label: 'ENTERPRISE MANAGER',
    value: 'ENTERPRISE MANAGER',
  },
  {
    label: 'ENTERPRISE MINER',
    value: 'ENTERPRISE MINER',
  },
  {
    label: 'ENTERPRISE ONE',
    value: 'ENTERPRISE ONE',
  },
  {
    label: 'ENTERPRISE OSS',
    value: 'ENTERPRISE OSS',
  },
  {
    label: 'ENTITY FRAMEWORK',
    value: 'ENTITY FRAMEWORK',
  },
  {
    label: 'ENTITY RELATIONSHIP DIAGRAMS',
    value: 'ENTITY RELATIONSHIP DIAGRAMS',
  },
  {
    label: 'EPICORE',
    value: 'EPICORE',
  },
  {
    label: 'ER STUDIO',
    value: 'ER STUDIO',
  },
  {
    label: 'ERA',
    value: 'ERA',
  },
  {
    label: 'ERLANG',
    value: 'ERLANG',
  },
  {
    label: 'ERP',
    value: 'ERP',
  },
  {
    label: 'ERWIN',
    value: 'ERWIN',
  },
  {
    label: 'ERWIN DATA MODELER',
    value: 'ERWIN DATA MODELER',
  },
  {
    label: 'ERWIN ERD',
    value: 'ERWIN ERD',
  },
  {
    label: 'ESCRIPT',
    value: 'ESCRIPT',
  },
  {
    label: 'ESCROW ACCOUNTS',
    value: 'ESCROW ACCOUNTS',
  },
  {
    label: 'ESKER',
    value: 'ESKER',
  },
  {
    label: 'ESQL',
    value: 'ESQL',
  },
  {
    label: 'ESSBASE',
    value: 'ESSBASE',
  },
  {
    label: 'ESSBASE EXCEL',
    value: 'ESSBASE EXCEL',
  },
  {
    label: 'ESSBASE INTEGRATION SERVICES',
    value: 'ESSBASE INTEGRATION SERVICES',
  },
  {
    label: 'ESSBASE STUDIO',
    value: 'ESSBASE STUDIO',
  },
  {
    label: 'ESSBASEMBA',
    value: 'ESSBASEMBA',
  },
  {
    label: 'ESSCMD',
    value: 'ESSCMD',
  },
  {
    label: 'ESX',
    value: 'ESX',
  },
  {
    label: 'ESXI',
    value: 'ESXI',
  },
  {
    label: 'ETHERNET',
    value: 'ETHERNET',
  },
  {
    label: 'ETHERNET SWITCHING',
    value: 'ETHERNET SWITCHING',
  },
  {
    label: 'ETL',
    value: 'ETL',
  },
  {
    label: 'ETTERCAP',
    value: 'ETTERCAP',
  },
  {
    label: 'EXCEL BI',
    value: 'EXCEL BI',
  },
  {
    label: 'EXCEL CONNECTOR',
    value: 'EXCEL CONNECTOR',
  },
  {
    label: 'EXCEL MACROS',
    value: 'EXCEL MACROS',
  },
  {
    label: 'EXCEL MODELING',
    value: 'EXCEL MODELING',
  },
  {
    label: 'EXCEL POWER PIVOT',
    value: 'EXCEL POWER PIVOT',
  },
  {
    label: 'EXCEL POWER USER',
    value: 'EXCEL POWER USER',
  },
  {
    label: 'EXCEL POWERPIVOT',
    value: 'EXCEL POWERPIVOT',
  },
  {
    label: 'EXCEL POWERPOINT',
    value: 'EXCEL POWERPOINT',
  },
  {
    label: 'EXCEL SERVICES',
    value: 'EXCEL SERVICES',
  },
  {
    label: 'EXCEL VBA',
    value: 'EXCEL VBA',
  },
  {
    label: 'EXCHANGE',
    value: 'EXCHANGE',
  },
  {
    label: 'EXCHANGE 2008',
    value: 'EXCHANGE 2008',
  },
  {
    label: 'EXEC VP/PROVOST',
    value: 'EXEC VP/PROVOST',
  },
  {
    label: 'EXECUTE',
    value: 'EXECUTE',
  },
  {
    label: 'EXECUTION',
    value: 'EXECUTION',
  },
  {
    label: 'EXEMPT FULL TIME',
    value: 'EXEMPT FULL TIME',
  },
  {
    label: 'EXPLORATORY ANALYSIS',
    value: 'EXPLORATORY ANALYSIS',
  },
  {
    label: 'EXPLORATORY DATA ANALYSIS',
    value: 'EXPLORATORY DATA ANALYSIS',
  },
  {
    label: 'EXPLORATORY PROTOTYPES',
    value: 'EXPLORATORY PROTOTYPES',
  },
  {
    label: 'EXPLORATORY TESTING',
    value: 'EXPLORATORY TESTING',
  },
  {
    label: 'EXPRESSJS',
    value: 'EXPRESSJS',
  },
  {
    label: 'EXTJS',
    value: 'EXTJS',
  },
  {
    label: 'FACTOR ANALYSIS',
    value: 'FACTOR ANALYSIS',
  },
  {
    label: 'FACTOR ANALYSIS/PCA',
    value: 'FACTOR ANALYSIS/PCA',
  },
  {
    label: 'FALCON',
    value: 'FALCON',
  },
  {
    label: 'FALCONVIEW',
    value: 'FALCONVIEW',
  },
  {
    label: 'FARGATE',
    value: 'FARGATE',
  },
  {
    label: 'FAST LOAD',
    value: 'FAST LOAD',
  },
  {
    label: 'FASTLANE',
    value: 'FASTLANE',
  },
  {
    label: 'FAULT ANALYZER',
    value: 'FAULT ANALYZER',
  },
  {
    label: 'FAULT TOLERANT',
    value: 'FAULT TOLERANT',
  },
  {
    label: 'FCIP',
    value: 'FCIP',
  },
  {
    label: 'FCOE',
    value: 'FCOE',
  },
  {
    label: 'FEATURE ENGINEERING',
    value: 'FEATURE ENGINEERING',
  },
  {
    label: 'FEATURE SELECTION',
    value: 'FEATURE SELECTION',
  },
  {
    label: 'FIORI',
    value: 'FIORI',
  },
  {
    label: 'FLASH',
    value: 'FLASH',
  },
  {
    label: 'FLASK',
    value: 'FLASK',
  },
  {
    label: 'FLEXNET',
    value: 'FLEXNET',
  },
  {
    label: 'FLINK',
    value: 'FLINK',
  },
  {
    label: 'FLUENTD',
    value: 'FLUENTD',
  },
  {
    label: 'FLUME',
    value: 'FLUME',
  },
  {
    label: 'FLUME AND KAFKA',
    value: 'FLUME AND KAFKA',
  },
  {
    label: 'FLUTTER',
    value: 'FLUTTER',
  },
  {
    label: 'FLUX',
    value: 'FLUX',
  },
  {
    label: 'FLYWAY',
    value: 'FLYWAY',
  },
  {
    label: 'FORMS',
    value: 'FORMS',
  },
  {
    label: 'FORMS 10G',
    value: 'FORMS 10G',
  },
  {
    label: 'FORMS DESIGNER',
    value: 'FORMS DESIGNER',
  },
  {
    label: 'FORTIFY',
    value: 'FORTIFY',
  },
  {
    label: 'FORTRAN',
    value: 'FORTRAN',
  },
  {
    label: 'FRAME RELAY',
    value: 'FRAME RELAY',
  },
  {
    label: 'FRAMEWORK',
    value: 'FRAMEWORK',
  },
  {
    label: 'FRAMEWORK 7',
    value: 'FRAMEWORK 7',
  },
  {
    label: 'FRAMEWORK MODELING',
    value: 'FRAMEWORK MODELING',
  },
  {
    label: 'FREERTOS',
    value: 'FREERTOS',
  },
  {
    label: 'FREESURFER',
    value: 'FREESURFER',
  },
  {
    label: 'FREESWITCH',
    value: 'FREESWITCH',
  },
  {
    label: 'FREEWHEEL',
    value: 'FREEWHEEL',
  },
  {
    label: 'FTP',
    value: 'FTP',
  },
  {
    label: 'FUNCTIONAL TESTING',
    value: 'FUNCTIONAL TESTING',
  },
  {
    label: 'GAAP',
    value: 'GAAP',
  },
  {
    label: 'GA-AUGUSTA',
    value: 'GA-AUGUSTA',
  },
  {
    label: 'GAIA AJAX WIDGETS',
    value: 'GAIA AJAX WIDGETS',
  },
  {
    label: 'GAP ANALYSIS',
    value: 'GAP ANALYSIS',
  },
  {
    label: 'GATEWAYS',
    value: 'GATEWAYS',
  },
  {
    label: 'GATEWAYSCRIPTS',
    value: 'GATEWAYSCRIPTS',
  },
  {
    label: 'GATP',
    value: 'GATP',
  },
  {
    label: 'GATSBY',
    value: 'GATSBY',
  },
  {
    label: 'GATSBY.JS',
    value: 'GATSBY.JS',
  },
  {
    label: 'GCC',
    value: 'GCC',
  },
  {
    label: 'GCP',
    value: 'GCP',
  },
  {
    label: 'GENERATIVE MODEL',
    value: 'GENERATIVE MODEL',
  },
  {
    label: 'GENSIM',
    value: 'GENSIM',
  },
  {
    label: 'GEOPANDAS',
    value: 'GEOPANDAS',
  },
  {
    label: 'GERRIT',
    value: 'GERRIT',
  },
  {
    label: 'GGPLOT',
    value: 'GGPLOT',
  },
  {
    label: 'GG-PLOT',
    value: 'GG-PLOT',
  },
  {
    label: 'GGPLOT2',
    value: 'GGPLOT2',
  },
  {
    label: 'GHIDRA',
    value: 'GHIDRA',
  },
  {
    label: 'GIRAPH',
    value: 'GIRAPH',
  },
  {
    label: 'GIS',
    value: 'GIS',
  },
  {
    label: 'GIT',
    value: 'GIT',
  },
  {
    label: 'GIT LAB',
    value: 'GIT LAB',
  },
  {
    label: 'GIT PUTTY WINSCP',
    value: 'GIT PUTTY WINSCP',
  },
  {
    label: 'GIT SCM',
    value: 'GIT SCM',
  },
  {
    label: 'GIT/BITBUCKET',
    value: 'GIT/BITBUCKET',
  },
  {
    label: 'GIT/STASH',
    value: 'GIT/STASH',
  },
  {
    label: 'GIT/SVN',
    value: 'GIT/SVN',
  },
  {
    label: 'GIT-BIT BUCKET',
    value: 'GIT-BIT BUCKET',
  },
  {
    label: 'GITHUB PIPELINES',
    value: 'GITHUB PIPELINES',
  },
  {
    label: 'GITLAB',
    value: 'GITLAB',
  },
  {
    label: 'GITLAB CI',
    value: 'GITLAB CI',
  },
  {
    label: 'GITLAB CI/CD',
    value: 'GITLAB CI/CD',
  },
  {
    label: 'GITLAB PIPELINE',
    value: 'GITLAB PIPELINE',
  },
  {
    label: 'GITLAB RUNNERS',
    value: 'GITLAB RUNNERS',
  },
  {
    label: 'GITLAB-CI',
    value: 'GITLAB-CI',
  },
  {
    label: 'GLACIER',
    value: 'GLACIER',
  },
  {
    label: 'GLM',
    value: 'GLM',
  },
  {
    label: 'GLUESQL',
    value: 'GLUESQL',
  },
  {
    label: 'GNU',
    value: 'GNU',
  },
  {
    label: 'GO',
    value: 'GO',
  },
  {
    label: 'GOLANG',
    value: 'GOLANG',
  },
  {
    label: 'GOLDENGATE',
    value: 'GOLDENGATE',
  },
  {
    label: 'GOOGLE & ADOBE ANALYTICS',
    value: 'GOOGLE & ADOBE ANALYTICS',
  },
  {
    label: 'GOOGLE AD MANAGER',
    value: 'GOOGLE AD MANAGER',
  },
  {
    label: 'GOOGLE AD WORDS',
    value: 'GOOGLE AD WORDS',
  },
  {
    label: 'GOOGLE ADS',
    value: 'GOOGLE ADS',
  },
  {
    label: 'GOOGLE AI PLATFORM',
    value: 'GOOGLE AI PLATFORM',
  },
  {
    label: 'GOOGLE ANALYTICS',
    value: 'GOOGLE ANALYTICS',
  },
  {
    label: 'GOOGLE ANALYTICS 360',
    value: 'GOOGLE ANALYTICS 360',
  },
  {
    label: 'GOOGLE API',
    value: 'GOOGLE API',
  },
  {
    label: 'GOOGLE APPS SCRIPT',
    value: 'GOOGLE APPS SCRIPT',
  },
  {
    label: 'GOOGLE APPS SUITE',
    value: 'GOOGLE APPS SUITE',
  },
  {
    label: 'GOOGLE BIG QUERY',
    value: 'GOOGLE BIG QUERY',
  },
  {
    label: 'GOOGLE BIGQUERY SQL',
    value: 'GOOGLE BIGQUERY SQL',
  },
  {
    label: 'GOOGLE CLOUD COMPOSER',
    value: 'GOOGLE CLOUD COMPOSER',
  },
  {
    label: 'GOOGLE CLOUD COMPUTE',
    value: 'GOOGLE CLOUD COMPUTE',
  },
  {
    label: 'GOOGLE CLOUD PLATFORM',
    value: 'GOOGLE CLOUD PLATFORM',
  },
  {
    label: 'GOOGLE CLOUD SDK',
    value: 'GOOGLE CLOUD SDK',
  },
  {
    label: 'GOOGLE CLOUD SQL',
    value: 'GOOGLE CLOUD SQL',
  },
  {
    label: 'GOOGLE CLOUD STORAGE',
    value: 'GOOGLE CLOUD STORAGE',
  },
  {
    label: 'GOOGLE COLAB',
    value: 'GOOGLE COLAB',
  },
  {
    label: 'GOOGLE DATA STUDIO',
    value: 'GOOGLE DATA STUDIO',
  },
  {
    label: 'GOOGLE DATAFLOW',
    value: 'GOOGLE DATAFLOW',
  },
  {
    label: 'GOOGLE DEVELOPER APIS',
    value: 'GOOGLE DEVELOPER APIS',
  },
  {
    label: 'GOOGLE DIALOGFLOW',
    value: 'GOOGLE DIALOGFLOW',
  },
  {
    label: 'GOOGLE GUAVA',
    value: 'GOOGLE GUAVA',
  },
  {
    label: 'GOOGLE GUICE',
    value: 'GOOGLE GUICE',
  },
  {
    label: 'GOOGLE KUBERNETES ENGINE',
    value: 'GOOGLE KUBERNETES ENGINE',
  },
  {
    label: 'GOOGLE WEBMASTER',
    value: 'GOOGLE WEBMASTER',
  },
  {
    label: 'GOOGLE/ADOBE ANALYTICS',
    value: 'GOOGLE/ADOBE ANALYTICS',
  },
  {
    label: 'GOOGLENET',
    value: 'GOOGLENET',
  },
  {
    label: 'GPU',
    value: 'GPU',
  },
  {
    label: 'GPU CLUSTERS',
    value: 'GPU CLUSTERS',
  },
  {
    label: 'GPU PROGRAMMING',
    value: 'GPU PROGRAMMING',
  },
  {
    label: 'GRADIENT BOOST',
    value: 'GRADIENT BOOST',
  },
  {
    label: 'GRADIENT BOOST MACHINES',
    value: 'GRADIENT BOOST MACHINES',
  },
  {
    label: 'GRADIENT BOOSTING',
    value: 'GRADIENT BOOSTING',
  },
  {
    label: 'GRADIENT BOOSTING TREES',
    value: 'GRADIENT BOOSTING TREES',
  },
  {
    label: 'GRADLE',
    value: 'GRADLE',
  },
  {
    label: 'GRADLE/MAVEN',
    value: 'GRADLE/MAVEN',
  },
  {
    label: 'GRADS',
    value: 'GRADS',
  },
  {
    label: 'GRAFANA',
    value: 'GRAFANA',
  },
  {
    label: 'GRAILS',
    value: 'GRAILS',
  },
  {
    label: 'GRAPH DATABASE',
    value: 'GRAPH DATABASE',
  },
  {
    label: 'GRAPHDB',
    value: 'GRAPHDB',
  },
  {
    label: 'GRAPHLETS',
    value: 'GRAPHLETS',
  },
  {
    label: 'GRAPHQL',
    value: 'GRAPHQL',
  },
  {
    label: 'GRAPHS',
    value: 'GRAPHS',
  },
  {
    label: 'GRAYLOG',
    value: 'GRAYLOG',
  },
  {
    label: 'GREENDAO',
    value: 'GREENDAO',
  },
  {
    label: 'GREENPLUM',
    value: 'GREENPLUM',
  },
  {
    label: 'GREMLIN',
    value: 'GREMLIN',
  },
  {
    label: 'GRID CONTROL',
    value: 'GRID CONTROL',
  },
  {
    label: 'GRID SETUP',
    value: 'GRID SETUP',
  },
  {
    label: 'GRIPPING',
    value: 'GRIPPING',
  },
  {
    label: 'GROK',
    value: 'GROK',
  },
  {
    label: 'GROOVY',
    value: 'GROOVY',
  },
  {
    label: 'GROOVY AND CHEF',
    value: 'GROOVY AND CHEF',
  },
  {
    label: 'GROOVY SCRIPT',
    value: 'GROOVY SCRIPT',
  },
  {
    label: 'GROOVY SCRIPTS',
    value: 'GROOVY SCRIPTS',
  },
  {
    label: 'GROWLER',
    value: 'GROWLER',
  },
  {
    label: 'GRU',
    value: 'GRU',
  },
  {
    label: 'GRUNT',
    value: 'GRUNT',
  },
  {
    label: 'GSQL',
    value: 'GSQL',
  },
  {
    label: 'GUI',
    value: 'GUI',
  },
  {
    label: 'GUI TESTING',
    value: 'GUI TESTING',
  },
  {
    label: 'GUNICORN',
    value: 'GUNICORN',
  },
  {
    label: 'GWT',
    value: 'GWT',
  },
  {
    label: 'H20',
    value: 'H20',
  },
  {
    label: 'HADOOP',
    value: 'HADOOP',
  },
  {
    label: 'HADOOP CLUSTER',
    value: 'HADOOP CLUSTER',
  },
  {
    label: 'HADOOP CLUSTERING',
    value: 'HADOOP CLUSTERING',
  },
  {
    label: 'HADOOP DATA SOURCES',
    value: 'HADOOP DATA SOURCES',
  },
  {
    label: 'HADOOP DATABASE HBASE',
    value: 'HADOOP DATABASE HBASE',
  },
  {
    label: 'HADOOP DISTRIBUTION',
    value: 'HADOOP DISTRIBUTION',
  },
  {
    label: 'HADOOP ECOSYSTEM',
    value: 'HADOOP ECOSYSTEM',
  },
  {
    label: 'HADOOP ECOSYSTM',
    value: 'HADOOP ECOSYSTM',
  },
  {
    label: 'HADOOP HDFS',
    value: 'HADOOP HDFS',
  },
  {
    label: 'HADOOP MAPREDUCE',
    value: 'HADOOP MAPREDUCE',
  },
  {
    label: 'HADOOP SPARK',
    value: 'HADOOP SPARK',
  },
  {
    label: 'HADOOP STACK',
    value: 'HADOOP STACK',
  },
  {
    label: 'HADOOPARCHITECTURE',
    value: 'HADOOPARCHITECTURE',
  },
  {
    label: 'HADOOPDATA',
    value: 'HADOOPDATA',
  },
  {
    label: 'HADOOP-L3',
    value: 'HADOOP-L3',
  },
  {
    label: 'HAIL',
    value: 'HAIL',
  },
  {
    label: 'HANA',
    value: 'HANA',
  },
  {
    label: 'HANA DATA MODELS',
    value: 'HANA DATA MODELS',
  },
  {
    label: 'HANA MODELS',
    value: 'HANA MODELS',
  },
  {
    label: 'HAPROXY',
    value: 'HAPROXY',
  },
  {
    label: 'HAPS',
    value: 'HAPS',
  },
  {
    label: 'HBASE',
    value: 'HBASE',
  },
  {
    label: 'HDFS',
    value: 'HDFS',
  },
  {
    label: 'HDP',
    value: 'HDP',
  },
  {
    label: 'HELION CLOUD',
    value: 'HELION CLOUD',
  },
  {
    label: 'HEROKU',
    value: 'HEROKU',
  },
  {
    label: 'HIBERNATE',
    value: 'HIBERNATE',
  },
  {
    label: 'HIERARCHICAL K-MEANS',
    value: 'HIERARCHICAL K-MEANS',
  },
  {
    label: 'HIL TESING',
    value: 'HIL TESING',
  },
  {
    label: 'HIVE',
    value: 'HIVE',
  },
  {
    label: 'HIVE EXPOSURE',
    value: 'HIVE EXPOSURE',
  },
  {
    label: 'HIVE SCRIPT',
    value: 'HIVE SCRIPT',
  },
  {
    label: 'HIVE SPARK',
    value: 'HIVE SPARK',
  },
  {
    label: 'HIVE SQL',
    value: 'HIVE SQL',
  },
  {
    label: 'HIVE TABLES',
    value: 'HIVE TABLES',
  },
  {
    label: 'HIVE TARGET',
    value: 'HIVE TARGET',
  },
  {
    label: 'HIVE-L3',
    value: 'HIVE-L3',
  },
  {
    label: 'HIVEQL',
    value: 'HIVEQL',
  },
  {
    label: 'HLD',
    value: 'HLD',
  },
  {
    label: 'HLOOKUP',
    value: 'HLOOKUP',
  },
  {
    label: 'HMM',
    value: 'HMM',
  },
  {
    label: 'HORIZON',
    value: 'HORIZON',
  },
  {
    label: 'HORIZON SUITE',
    value: 'HORIZON SUITE',
  },
  {
    label: 'HORIZONSQL',
    value: 'HORIZONSQL',
  },
  {
    label: 'HOROVOD',
    value: 'HOROVOD',
  },
  {
    label: 'HORTON WORKS',
    value: 'HORTON WORKS',
  },
  {
    label: 'HORTONWORKS',
    value: 'HORTONWORKS',
  },
  {
    label: 'HOTJAR',
    value: 'HOTJAR',
  },
  {
    label: 'HP',
    value: 'HP',
  },
  {
    label: 'HP ALM',
    value: 'HP ALM',
  },
  {
    label: 'HP PERFORMANCE CENTER',
    value: 'HP PERFORMANCE CENTER',
  },
  {
    label: 'HP QUALITY CENTER 9.2',
    value: 'HP QUALITY CENTER 9.2',
  },
  {
    label: 'HQL',
    value: 'HQL',
  },
  {
    label: 'HTML',
    value: 'HTML',
  },
  {
    label: 'HTML 5',
    value: 'HTML 5',
  },
  {
    label: 'HTML5',
    value: 'HTML5',
  },
  {
    label: 'HTTP',
    value: 'HTTP',
  },
  {
    label: 'HUG',
    value: 'HUG',
  },
  {
    label: 'HYBRID FRAMEWORK',
    value: 'HYBRID FRAMEWORK',
  },
  {
    label: 'HYGIEIA',
    value: 'HYGIEIA',
  },
  {
    label: 'HYPERPARAMETER-TUNING',
    value: 'HYPERPARAMETER-TUNING',
  },
  {
    label: 'HYPERSONIC SQL',
    value: 'HYPERSONIC SQL',
  },
  {
    label: 'HYPOTHESIS',
    value: 'HYPOTHESIS',
  },
  {
    label: 'HYPOTHESIS TESTING',
    value: 'HYPOTHESIS TESTING',
  },
  {
    label: 'IBATIS',
    value: 'IBATIS',
  },
  {
    label: 'IBM AS/400',
    value: 'IBM AS/400',
  },
  {
    label: 'IBM COGNOS',
    value: 'IBM COGNOS',
  },
  {
    label: 'IBM CPLEX',
    value: 'IBM CPLEX',
  },
  {
    label: 'IBM INFORMIX',
    value: 'IBM INFORMIX',
  },
  {
    label: 'IBM INFOSPHERE',
    value: 'IBM INFOSPHERE',
  },
  {
    label: 'IBM INFOSPHERE DATASTAGE',
    value: 'IBM INFOSPHERE DATASTAGE',
  },
  {
    label: 'IBM RTC',
    value: 'IBM RTC',
  },
  {
    label: 'IBM SERVER',
    value: 'IBM SERVER',
  },
  {
    label: 'IBM-WATSON',
    value: 'IBM-WATSON',
  },
  {
    label: 'IIS ADMIN',
    value: 'IIS ADMIN',
  },
  {
    label: 'IIS SERVER',
    value: 'IIS SERVER',
  },
  {
    label: 'IIS WEB SERVER',
    value: 'IIS WEB SERVER',
  },
  {
    label: 'IMAGE-CLASSIFICATION',
    value: 'IMAGE-CLASSIFICATION',
  },
  {
    label: 'IMAGE-PROCESSING',
    value: 'IMAGE-PROCESSING',
  },
  {
    label: 'IMAGE-RECOGNITION',
    value: 'IMAGE-RECOGNITION',
  },
  {
    label: 'IMPALA',
    value: 'IMPALA',
  },
  {
    label: 'IMS XPONENT',
    value: 'IMS XPONENT',
  },
  {
    label: 'INDEXERS',
    value: 'INDEXERS',
  },
  {
    label: 'INFERENTIAL STATISTICS',
    value: 'INFERENTIAL STATISTICS',
  },
  {
    label: 'INFOGIX ASSURE',
    value: 'INFOGIX ASSURE',
  },
  {
    label: 'INFORMATICA',
    value: 'INFORMATICA',
  },
  {
    label: 'INFORMATICA 8.6.1',
    value: 'INFORMATICA 8.6.1',
  },
  {
    label: 'INFORMATICA DATA QUALITY',
    value: 'INFORMATICA DATA QUALITY',
  },
  {
    label: 'INFORMATICA ETL',
    value: 'INFORMATICA ETL',
  },
  {
    label: 'INFORMATICA POWER',
    value: 'INFORMATICA POWER',
  },
  {
    label: 'INFORMATICA POWER CENTER 9.5.1 MS VISIO',
    value: 'INFORMATICA POWER CENTER 9.5.1 MS VISIO',
  },
  {
    label: 'INFORMATICA POWER CENTRE 9.0',
    value: 'INFORMATICA POWER CENTRE 9.0',
  },
  {
    label: 'INFORMATICADATA EXPLORER',
    value: 'INFORMATICADATA EXPLORER',
  },
  {
    label: 'INFRASTRUCTURE AS CODE',
    value: 'INFRASTRUCTURE AS CODE',
  },
  {
    label: 'INGENIOUS MVC',
    value: 'INGENIOUS MVC',
  },
  {
    label: 'INTEGRATION TESTING',
    value: 'INTEGRATION TESTING',
  },
  {
    label: 'INTEL XDK',
    value: 'INTEL XDK',
  },
  {
    label: 'INTELLIJ',
    value: 'INTELLIJ',
  },
  {
    label: 'INTELLIJ CE',
    value: 'INTELLIJ CE',
  },
  {
    label: 'INTERNET GATEWAYS',
    value: 'INTERNET GATEWAYS',
  },
  {
    label: 'INTRANET',
    value: 'INTRANET',
  },
  {
    label: 'INV',
    value: 'INV',
  },
  {
    label: 'IONIC FRAMEWORK',
    value: 'IONIC FRAMEWORK',
  },
  {
    label: 'IOS',
    value: 'IOS',
  },
  {
    label: 'IPYTHON',
    value: 'IPYTHON',
  },
  {
    label: 'IVR',
    value: 'IVR',
  },
  {
    label: 'J2EE',
    value: 'J2EE',
  },
  {
    label: 'J2EE (ANDROID & IOS)',
    value: 'J2EE (ANDROID & IOS)',
  },
  {
    label: 'J2SE',
    value: 'J2SE',
  },
  {
    label: 'JABBER',
    value: 'JABBER',
  },
  {
    label: 'JACOCO',
    value: 'JACOCO',
  },
  {
    label: 'JADOCS',
    value: 'JADOCS',
  },
  {
    label: 'JAHIA',
    value: 'JAHIA',
  },
  {
    label: 'JAMA',
    value: 'JAMA',
  },
  {
    label: 'JAMIS',
    value: 'JAMIS',
  },
  {
    label: 'JASMINE',
    value: 'JASMINE',
  },
  {
    label: 'JASPER',
    value: 'JASPER',
  },
  {
    label: 'JASPER IREPORTS',
    value: 'JASPER IREPORTS',
  },
  {
    label: 'JASPER REPORTS',
    value: 'JASPER REPORTS',
  },
  {
    label: 'JASPERSOFT',
    value: 'JASPERSOFT',
  },
  {
    label: 'JAVA',
    value: 'JAVA',
  },
  {
    label: 'JAVA (ANDROID & IOS)',
    value: 'JAVA (ANDROID & IOS)',
  },
  {
    label: 'JAVA /TESTNG',
    value: 'JAVA /TESTNG',
  },
  {
    label: 'JAVA 8 ECLIPSE',
    value: 'JAVA 8 ECLIPSE',
  },
  {
    label: 'JAVA APPSCRIPT',
    value: 'JAVA APPSCRIPT',
  },
  {
    label: 'JAVA BYTECODE',
    value: 'JAVA BYTECODE',
  },
  {
    label: 'JAVA EE',
    value: 'JAVA EE',
  },
  {
    label: 'JAVA ENTERPRISE EDITION',
    value: 'JAVA ENTERPRISE EDITION',
  },
  {
    label: 'JAVA MAP REDUCE',
    value: 'JAVA MAP REDUCE',
  },
  {
    label: 'JAVA MICRO SERVICES',
    value: 'JAVA MICRO SERVICES',
  },
  {
    label: 'JAVA RESTLET',
    value: 'JAVA RESTLET',
  },
  {
    label: 'JAVA SERVLETS',
    value: 'JAVA SERVLETS',
  },
  {
    label: 'JAVA SPRING BOOT',
    value: 'JAVA SPRING BOOT',
  },
  {
    label: 'JAVA SPRINGBOOT',
    value: 'JAVA SPRINGBOOT',
  },
  {
    label: 'JAVA STACK',
    value: 'JAVA STACK',
  },
  {
    label: 'JAVA SWING',
    value: 'JAVA SWING',
  },
  {
    label: 'JAVASCRIPT',
    value: 'JAVASCRIPT',
  },
  {
    label: 'JAVASCRIPT (ANGULAR)',
    value: 'JAVASCRIPT (ANGULAR)',
  },
  {
    label: 'JAVASCRIPT D3',
    value: 'JAVASCRIPT D3',
  },
  {
    label: 'JAVA-SQL',
    value: 'JAVA-SQL',
  },
  {
    label: 'JAVELIN TERRITORY DESIGNER',
    value: 'JAVELIN TERRITORY DESIGNER',
  },
  {
    label: 'JAWS',
    value: 'JAWS',
  },
  {
    label: 'JAXB',
    value: 'JAXB',
  },
  {
    label: 'JAX-RS',
    value: 'JAX-RS',
  },
  {
    label: 'JAXWS',
    value: 'JAXWS',
  },
  {
    label: 'JAX-WS',
    value: 'JAX-WS',
  },
  {
    label: 'JAYROCK',
    value: 'JAYROCK',
  },
  {
    label: 'JAZZ',
    value: 'JAZZ',
  },
  {
    label: 'JBC-P',
    value: 'JBC-P',
  },
  {
    label: 'JBEHAVE',
    value: 'JBEHAVE',
  },
  {
    label: 'JBOSS',
    value: 'JBOSS',
  },
  {
    label: 'JBOSS-EWS',
    value: 'JBOSS-EWS',
  },
  {
    label: 'JBPM',
    value: 'JBPM',
  },
  {
    label: 'JCL',
    value: 'JCL',
  },
  {
    label: 'JCL MVS',
    value: 'JCL MVS',
  },
  {
    label: 'JD EDWARDS',
    value: 'JD EDWARDS',
  },
  {
    label: 'JDA',
    value: 'JDA',
  },
  {
    label: 'JDBC',
    value: 'JDBC',
  },
  {
    label: 'JDEVELOPER',
    value: 'JDEVELOPER',
  },
  {
    label: 'JDEVELOPER IDE',
    value: 'JDEVELOPER IDE',
  },
  {
    label: 'JDOM',
    value: 'JDOM',
  },
  {
    label: 'JENKINS',
    value: 'JENKINS',
  },
  {
    label: 'JENKINS PIPELINE',
    value: 'JENKINS PIPELINE',
  },
  {
    label: 'JEST',
    value: 'JEST',
  },
  {
    label: 'JET REPORTS',
    value: 'JET REPORTS',
  },
  {
    label: 'JETSON',
    value: 'JETSON',
  },
  {
    label: 'JETTY',
    value: 'JETTY',
  },
  {
    label: 'JHIPSTER',
    value: 'JHIPSTER',
  },
  {
    label: 'JINJA 2',
    value: 'JINJA 2',
  },
  {
    label: 'JIRA',
    value: 'JIRA',
  },
  {
    label: 'JIRA ADMIN',
    value: 'JIRA ADMIN',
  },
  {
    label: 'JITTERBIT',
    value: 'JITTERBIT',
  },
  {
    label: 'JMETER',
    value: 'JMETER',
  },
  {
    label: 'JMOCK',
    value: 'JMOCK',
  },
  {
    label: 'JMP',
    value: 'JMP',
  },
  {
    label: 'JMP SCRIPTING',
    value: 'JMP SCRIPTING',
  },
  {
    label: 'JMS',
    value: 'JMS',
  },
  {
    label: 'JNDI',
    value: 'JNDI',
  },
  {
    label: 'JPA',
    value: 'JPA',
  },
  {
    label: 'JPROFILER',
    value: 'JPROFILER',
  },
  {
    label: 'JQUERY',
    value: 'JQUERY',
  },
  {
    label: 'J-QUERY',
    value: 'J-QUERY',
  },
  {
    label: 'JRUBY',
    value: 'JRUBY',
  },
  {
    label: 'JS',
    value: 'JS',
  },
  {
    label: 'JS PROGRAMMING',
    value: 'JS PROGRAMMING',
  },
  {
    label: 'JSF',
    value: 'JSF',
  },
  {
    label: 'JSON',
    value: 'JSON',
  },
  {
    label: 'JSP',
    value: 'JSP',
  },
  {
    label: 'JSP SERVLETS',
    value: 'JSP SERVLETS',
  },
  {
    label: 'JSP/SERVLETS',
    value: 'JSP/SERVLETS',
  },
  {
    label: 'JSQSH',
    value: 'JSQSH',
  },
  {
    label: 'JSTL',
    value: 'JSTL',
  },
  {
    label: 'JTEST',
    value: 'JTEST',
  },
  {
    label: 'JULES',
    value: 'JULES',
  },
  {
    label: 'JULIA',
    value: 'JULIA',
  },
  {
    label: 'JUNEAU',
    value: 'JUNEAU',
  },
  {
    label: 'JUNGLEDISK',
    value: 'JUNGLEDISK',
  },
  {
    label: 'JUNIT',
    value: 'JUNIT',
  },
  {
    label: 'JUNIT FRAMEWORK',
    value: 'JUNIT FRAMEWORK',
  },
  {
    label: 'JUNOS',
    value: 'JUNOS',
  },
  {
    label: 'JWSDP',
    value: 'JWSDP',
  },
  {
    label: 'JYTHON',
    value: 'JYTHON',
  },
  {
    label: 'K VALUE',
    value: 'K VALUE',
  },
  {
    label: 'KAFKA',
    value: 'KAFKA',
  },
  {
    label: 'KAFKA CONNECT',
    value: 'KAFKA CONNECT',
  },
  {
    label: 'KAFKA STREAMING',
    value: 'KAFKA STREAMING',
  },
  {
    label: 'KAFKA STREAMS',
    value: 'KAFKA STREAMS',
  },
  {
    label: 'KALTURA',
    value: 'KALTURA',
  },
  {
    label: 'KAMAILIO',
    value: 'KAMAILIO',
  },
  {
    label: 'KANBAN',
    value: 'KANBAN',
  },
  {
    label: 'KAPPA ARCHITECTURE',
    value: 'KAPPA ARCHITECTURE',
  },
  {
    label: 'KATALON STUDIO',
    value: 'KATALON STUDIO',
  },
  {
    label: 'KDB',
    value: 'KDB',
  },
  {
    label: 'KEIL',
    value: 'KEIL',
  },
  {
    label: 'KENDO UI',
    value: 'KENDO UI',
  },
  {
    label: 'KENSHOO',
    value: 'KENSHOO',
  },
  {
    label: 'KERAS',
    value: 'KERAS',
  },
  {
    label: 'KERBEROS',
    value: 'KERBEROS',
  },
  {
    label: 'KERBEROS AUTHENTICATION',
    value: 'KERBEROS AUTHENTICATION',
  },
  {
    label: 'KERMIT',
    value: 'KERMIT',
  },
  {
    label: 'KERNAL PCA',
    value: 'KERNAL PCA',
  },
  {
    label: 'KERNEL SVM',
    value: 'KERNEL SVM',
  },
  {
    label: 'K-FOLD CROSS VALIDATION',
    value: 'K-FOLD CROSS VALIDATION',
  },
  {
    label: 'KHOROS',
    value: 'KHOROS',
  },
  {
    label: 'KIBANA',
    value: 'KIBANA',
  },
  {
    label: 'KIMBALL',
    value: 'KIMBALL',
  },
  {
    label: 'KIMBALLDW',
    value: 'KIMBALLDW',
  },
  {
    label: 'KINESIS',
    value: 'KINESIS',
  },
  {
    label: 'KINESIS FIREHOSE',
    value: 'KINESIS FIREHOSE',
  },
  {
    label: 'KLIPFOLIO',
    value: 'KLIPFOLIO',
  },
  {
    label: 'K-MEANS',
    value: 'K-MEANS',
  },
  {
    label: 'KNACK',
    value: 'KNACK',
  },
  {
    label: 'KNATIVE',
    value: 'KNATIVE',
  },
  {
    label: 'KNIME',
    value: 'KNIME',
  },
  {
    label: 'KNN',
    value: 'KNN',
  },
  {
    label: 'KNOCKOUT',
    value: 'KNOCKOUT',
  },
  {
    label: 'KNOCKOUTJS',
    value: 'KNOCKOUTJS',
  },
  {
    label: 'KOFAX VRS ELITE',
    value: 'KOFAX VRS ELITE',
  },
  {
    label: 'KOTLIN',
    value: 'KOTLIN',
  },
  {
    label: 'KP-MINER',
    value: 'KP-MINER',
  },
  {
    label: 'KUBEFLOW',
    value: 'KUBEFLOW',
  },
  {
    label: 'KUBERNETES',
    value: 'KUBERNETES',
  },
  {
    label: 'KUDU',
    value: 'KUDU',
  },
  {
    label: 'KVM',
    value: 'KVM',
  },
  {
    label: 'LABVIEW',
    value: 'LABVIEW',
  },
  {
    label: 'LAMBDA',
    value: 'LAMBDA',
  },
  {
    label: 'LAMBDA ARCHITECTURE',
    value: 'LAMBDA ARCHITECTURE',
  },
  {
    label: 'LAMP',
    value: 'LAMP',
  },
  {
    label: 'LANGUAGE MODEL',
    value: 'LANGUAGE MODEL',
  },
  {
    label: 'LANSA',
    value: 'LANSA',
  },
  {
    label: 'LDA',
    value: 'LDA',
  },
  {
    label: 'LDAP',
    value: 'LDAP',
  },
  {
    label: 'LDD',
    value: 'LDD',
  },
  {
    label: 'LEMMATIZATION',
    value: 'LEMMATIZATION',
  },
  {
    label: 'LIGHTGBM',
    value: 'LIGHTGBM',
  },
  {
    label: 'LIKER',
    value: 'LIKER',
  },
  {
    label: 'LIMS',
    value: 'LIMS',
  },
  {
    label: 'LINEAR AND LOGISTIC REGRESSION',
    value: 'LINEAR AND LOGISTIC REGRESSION',
  },
  {
    label: 'LINEAR FLOW',
    value: 'LINEAR FLOW',
  },
  {
    label: 'LINEAR MODEL',
    value: 'LINEAR MODEL',
  },
  {
    label: 'LINEAR REGRESSION',
    value: 'LINEAR REGRESSION',
  },
  {
    label: 'LINQ',
    value: 'LINQ',
  },
  {
    label: 'LINQCONNECT',
    value: 'LINQCONNECT',
  },
  {
    label: 'LINUX',
    value: 'LINUX',
  },
  {
    label: 'LINUX FIREWALL',
    value: 'LINUX FIREWALL',
  },
  {
    label: 'LINUX LOGICAL',
    value: 'LINUX LOGICAL',
  },
  {
    label: 'LINUX SERVER',
    value: 'LINUX SERVER',
  },
  {
    label: 'LINUX SHELL',
    value: 'LINUX SHELL',
  },
  {
    label: 'LINUX SHELL SCRIPTS',
    value: 'LINUX SHELL SCRIPTS',
  },
  {
    label: 'LINUX VMS',
    value: 'LINUX VMS',
  },
  {
    label: 'LINUX/UBUNTU',
    value: 'LINUX/UBUNTU',
  },
  {
    label: 'LIQUIBASE',
    value: 'LIQUIBASE',
  },
  {
    label: 'LIVY',
    value: 'LIVY',
  },
  {
    label: 'LOADRUNNER',
    value: 'LOADRUNNER',
  },
  {
    label: 'LOANIQ',
    value: 'LOANIQ',
  },
  {
    label: 'LOCALITY SENSITIVE',
    value: 'LOCALITY SENSITIVE',
  },
  {
    label: 'LOG4J',
    value: 'LOG4J',
  },
  {
    label: 'LOGISTICREGRESSION',
    value: 'LOGISTICREGRESSION',
  },
  {
    label: 'LOGSTASH',
    value: 'LOGSTASH',
  },
  {
    label: 'LOINC',
    value: 'LOINC',
  },
  {
    label: 'LOOKER',
    value: 'LOOKER',
  },
  {
    label: 'LOOKML',
    value: 'LOOKML',
  },
  {
    label: 'LORA',
    value: 'LORA',
  },
  {
    label: 'LSA',
    value: 'LSA',
  },
  {
    label: 'LSMR',
    value: 'LSMR',
  },
  {
    label: 'LSTM',
    value: 'LSTM',
  },
  {
    label: 'LUIGI',
    value: 'LUIGI',
  },
  {
    label: 'LUMIRA',
    value: 'LUMIRA',
  },
  {
    label: 'LUNS',
    value: 'LUNS',
  },
  {
    label: 'MAAS',
    value: 'MAAS',
  },
  {
    label: 'MAC OS X',
    value: 'MAC OS X',
  },
  {
    label: 'MACHINE LEARNING',
    value: 'MACHINE LEARNING',
  },
  {
    label: 'MACINTOSH HD',
    value: 'MACINTOSH HD',
  },
  {
    label: 'MACRO',
    value: 'MACRO',
  },
  {
    label: 'MACROMEDIA FLASH',
    value: 'MACROMEDIA FLASH',
  },
  {
    label: 'MAGENTO',
    value: 'MAGENTO',
  },
  {
    label: 'MAGICDRAW',
    value: 'MAGICDRAW',
  },
  {
    label: 'MAHOUT',
    value: 'MAHOUT',
  },
  {
    label: 'MAINFRAME',
    value: 'MAINFRAME',
  },
  {
    label: 'MAINFRAME ADMIN',
    value: 'MAINFRAME ADMIN',
  },
  {
    label: 'MAINFRAME MANTIS',
    value: 'MAINFRAME MANTIS',
  },
  {
    label: 'MAINFRAME TESTING',
    value: 'MAINFRAME TESTING',
  },
  {
    label: 'MAINFRAMES',
    value: 'MAINFRAMES',
  },
  {
    label: 'MANAGEMENT STUDIO',
    value: 'MANAGEMENT STUDIO',
  },
  {
    label: 'MANOVA',
    value: 'MANOVA',
  },
  {
    label: 'MANTIS',
    value: 'MANTIS',
  },
  {
    label: 'MANUAL TESTING',
    value: 'MANUAL TESTING',
  },
  {
    label: 'MAPJOIN',
    value: 'MAPJOIN',
  },
  {
    label: 'MAPPLET DESIGNER',
    value: 'MAPPLET DESIGNER',
  },
  {
    label: 'MAPPLETS',
    value: 'MAPPLETS',
  },
  {
    label: 'MAPR',
    value: 'MAPR',
  },
  {
    label: 'MAPREDUCE',
    value: 'MAPREDUCE',
  },
  {
    label: 'MAPREDUCE ALGORITHM',
    value: 'MAPREDUCE ALGORITHM',
  },
  {
    label: 'MARIADB',
    value: 'MARIADB',
  },
  {
    label: 'MARIONETTE JS',
    value: 'MARIONETTE JS',
  },
  {
    label: 'MARKET BASKET ANALYSIS',
    value: 'MARKET BASKET ANALYSIS',
  },
  {
    label: 'MARKET-BASKET ANALYSIS',
    value: 'MARKET-BASKET ANALYSIS',
  },
  {
    label: 'MARKETO',
    value: 'MARKETO',
  },
  {
    label: 'MARKETSCAN',
    value: 'MARKETSCAN',
  },
  {
    label: 'MARKLOGIC',
    value: 'MARKLOGIC',
  },
  {
    label: 'MATCHCAD',
    value: 'MATCHCAD',
  },
  {
    label: 'MATHEMATICS',
    value: 'MATHEMATICS',
  },
  {
    label: 'MATILION',
    value: 'MATILION',
  },
  {
    label: 'MATLAB',
    value: 'MATLAB',
  },
  {
    label: 'MATPLOTLIB',
    value: 'MATPLOTLIB',
  },
  {
    label: 'MATRIX',
    value: 'MATRIX',
  },
  {
    label: 'MAVEN',
    value: 'MAVEN',
  },
  {
    label: 'MAVEN SCRIPT',
    value: 'MAVEN SCRIPT',
  },
  {
    label: 'MAVERICK LITE',
    value: 'MAVERICK LITE',
  },
  {
    label: 'MAVERICK.NET',
    value: 'MAVERICK.NET',
  },
  {
    label: 'MAXDB',
    value: 'MAXDB',
  },
  {
    label: 'MAXIMO',
    value: 'MAXIMO',
  },
  {
    label: 'MAXSTAT',
    value: 'MAXSTAT',
  },
  {
    label: 'MDM',
    value: 'MDM',
  },
  {
    label: 'MEMSQL',
    value: 'MEMSQL',
  },
  {
    label: 'MENTIS',
    value: 'MENTIS',
  },
  {
    label: 'MERCURIAL',
    value: 'MERCURIAL',
  },
  {
    label: 'MERCURY QUALITY CENTER',
    value: 'MERCURY QUALITY CENTER',
  },
  {
    label: 'MESOS',
    value: 'MESOS',
  },
  {
    label: 'METALOGIX',
    value: 'METALOGIX',
  },
  {
    label: 'METASPLOIT',
    value: 'METASPLOIT',
  },
  {
    label: 'METEOR.JS',
    value: 'METEOR.JS',
  },
  {
    label: 'MEXL',
    value: 'MEXL',
  },
  {
    label: 'MICRO FOCUS COBOL',
    value: 'MICRO FOCUS COBOL',
  },
  {
    label: 'MICROARRAYS',
    value: 'MICROARRAYS',
  },
  {
    label: 'MICROSERVICES',
    value: 'MICROSERVICES',
  },
  {
    label: 'MICROSOFT ACTIVE DIRECTORY',
    value: 'MICROSOFT ACTIVE DIRECTORY',
  },
  {
    label: 'MICROSOFT AJAX',
    value: 'MICROSOFT AJAX',
  },
  {
    label: 'MICROSOFT ANALYSIS SERVICES',
    value: 'MICROSOFT ANALYSIS SERVICES',
  },
  {
    label: 'MICROSOFT APPLICATION BLOCKS',
    value: 'MICROSOFT APPLICATION BLOCKS',
  },
  {
    label: 'MICROSOFT AZURE CLOUD',
    value: 'MICROSOFT AZURE CLOUD',
  },
  {
    label: 'MICROSOFT AZURE DATA LAKE',
    value: 'MICROSOFT AZURE DATA LAKE',
  },
  {
    label: 'MICROSOFT AZURE DATABRICKS',
    value: 'MICROSOFT AZURE DATABRICKS',
  },
  {
    label: 'MICROSOFT AZURE DEVOPS',
    value: 'MICROSOFT AZURE DEVOPS',
  },
  {
    label: 'MICROSOFT AZURE ML',
    value: 'MICROSOFT AZURE ML',
  },
  {
    label: 'MICROSOFT AZURE ML STUDIO',
    value: 'MICROSOFT AZURE ML STUDIO',
  },
  {
    label: 'MICROSOFT AZURE PAAS',
    value: 'MICROSOFT AZURE PAAS',
  },
  {
    label: 'MICROSOFT AZURE SERVICES',
    value: 'MICROSOFT AZURE SERVICES',
  },
  {
    label: 'MICROSOFT AZURE SQL',
    value: 'MICROSOFT AZURE SQL',
  },
  {
    label: 'MICROSOFT AZURE SQL DATA WAREHOUSE',
    value: 'MICROSOFT AZURE SQL DATA WAREHOUSE',
  },
  {
    label: 'MICROSOFT BI',
    value: 'MICROSOFT BI',
  },
  {
    label: 'MICROSOFT BI STACK',
    value: 'MICROSOFT BI STACK',
  },
  {
    label: 'MICROSOFT BIZTALK',
    value: 'MICROSOFT BIZTALK',
  },
  {
    label: 'MICROSOFT BLEND',
    value: 'MICROSOFT BLEND',
  },
  {
    label: 'MICROSOFT BLOB',
    value: 'MICROSOFT BLOB',
  },
  {
    label: 'MICROSOFT BOT',
    value: 'MICROSOFT BOT',
  },
  {
    label: 'MICROSOFT BUSINESS INTELLIGENCE (BI)',
    value: 'MICROSOFT BUSINESS INTELLIGENCE (BI)',
  },
  {
    label: 'MICROSOFT BUSINESS INTELLIGENCE STACK',
    value: 'MICROSOFT BUSINESS INTELLIGENCE STACK',
  },
  {
    label: 'MICROSOFT CLOUD ADOPTION',
    value: 'MICROSOFT CLOUD ADOPTION',
  },
  {
    label: 'MICROSOFT COSMOS',
    value: 'MICROSOFT COSMOS',
  },
  {
    label: 'MICROSOFT CRM',
    value: 'MICROSOFT CRM',
  },
  {
    label: 'MICROSOFT DATA',
    value: 'MICROSOFT DATA',
  },
  {
    label: 'MICROSOFT DATA TOOLS',
    value: 'MICROSOFT DATA TOOLS',
  },
  {
    label: 'MICROSOFT DAX',
    value: 'MICROSOFT DAX',
  },
  {
    label: 'MICROSOFT DYNAMICS',
    value: 'MICROSOFT DYNAMICS',
  },
  {
    label: 'MICROSOFT DYNAMICS 365',
    value: 'MICROSOFT DYNAMICS 365',
  },
  {
    label: 'MICROSOFT DYNAMICS AX',
    value: 'MICROSOFT DYNAMICS AX',
  },
  {
    label: 'MICROSOFT DYNAMICS CRM',
    value: 'MICROSOFT DYNAMICS CRM',
  },
  {
    label: 'MICROSOFT DYNAMICS SUITE',
    value: 'MICROSOFT DYNAMICS SUITE',
  },
  {
    label: 'MICROSOFT ENTITY FRAMEWORK',
    value: 'MICROSOFT ENTITY FRAMEWORK',
  },
  {
    label: 'MICROSOFT EXCEL/ TABLEAU',
    value: 'MICROSOFT EXCEL/ TABLEAU',
  },
  {
    label: 'MICROSOFT EXCEL/POWER BI',
    value: 'MICROSOFT EXCEL/POWER BI',
  },
  {
    label: 'MICROSOFT EXCHANGE',
    value: 'MICROSOFT EXCHANGE',
  },
  {
    label: 'MICROSOFT FIM',
    value: 'MICROSOFT FIM',
  },
  {
    label: 'MICROSOFT FOREFRONT IDENTITY MANAGER (FIM)',
    value: 'MICROSOFT FOREFRONT IDENTITY MANAGER (FIM)',
  },
  {
    label: 'MICROSOFT INFOPATH',
    value: 'MICROSOFT INFOPATH',
  },
  {
    label: 'MICROSOFT LUIS',
    value: 'MICROSOFT LUIS',
  },
  {
    label: 'MICROSOFT LYNC',
    value: 'MICROSOFT LYNC',
  },
  {
    label: 'MICROSOFT MANAGEMENT CONSOLE',
    value: 'MICROSOFT MANAGEMENT CONSOLE',
  },
  {
    label: 'MICROSOFT NAV',
    value: 'MICROSOFT NAV',
  },
  {
    label: 'MICROSOFT OFFICE 2010',
    value: 'MICROSOFT OFFICE 2010',
  },
  {
    label: 'MICROSOFT POWERSHELL',
    value: 'MICROSOFT POWERSHELL',
  },
  {
    label: 'MICROSOFT PROJECT 2010',
    value: 'MICROSOFT PROJECT 2010',
  },
  {
    label: 'MICROSOFT R',
    value: 'MICROSOFT R',
  },
  {
    label: 'MICROSOFT RDS',
    value: 'MICROSOFT RDS',
  },
  {
    label: 'MICROSOFT SCCM',
    value: 'MICROSOFT SCCM',
  },
  {
    label: 'MICROSOFT SCCM 2012',
    value: 'MICROSOFT SCCM 2012',
  },
  {
    label: 'MICROSOFT SEARCH',
    value: 'MICROSOFT SEARCH',
  },
  {
    label: 'MICROSOFT SHAREPOINT',
    value: 'MICROSOFT SHAREPOINT',
  },
  {
    label: 'MICROSOFT SQL SERVER ANALYSIS SERVICES',
    value: 'MICROSOFT SQL SERVER ANALYSIS SERVICES',
  },
  {
    label: 'MICROSOFT SQL STUDIO',
    value: 'MICROSOFT SQL STUDIO',
  },
  {
    label: 'MICROSOFT SUITE',
    value: 'MICROSOFT SUITE',
  },
  {
    label: 'MICROSOFT TEST MANAGER',
    value: 'MICROSOFT TEST MANAGER',
  },
  {
    label: 'MICROSOFT VISIO',
    value: 'MICROSOFT VISIO',
  },
  {
    label: 'MICROSOFT VISUAL BASIC',
    value: 'MICROSOFT VISUAL BASIC',
  },
  {
    label: 'MICROSOFT VISUAL STUDIO',
    value: 'MICROSOFT VISUAL STUDIO',
  },
  {
    label: 'MICROSOFT VISUAL STUDIO 2010',
    value: 'MICROSOFT VISUAL STUDIO 2010',
  },
  {
    label: 'MICROSOFT WINDOWS SERVER',
    value: 'MICROSOFT WINDOWS SERVER',
  },
  {
    label: 'MICROSTRATEGY',
    value: 'MICROSTRATEGY',
  },
  {
    label: 'MINITAB',
    value: 'MINITAB',
  },
  {
    label: 'MISCROSOFT ADVANCE',
    value: 'MISCROSOFT ADVANCE',
  },
  {
    label: 'MKS INTEGRITY CLIENT (VERSION TOOL)',
    value: 'MKS INTEGRITY CLIENT (VERSION TOOL)',
  },
  {
    label: 'ML LIB',
    value: 'ML LIB',
  },
  {
    label: 'ML SPARK',
    value: 'ML SPARK',
  },
  {
    label: 'ML/DL',
    value: 'ML/DL',
  },
  {
    label: 'MLIB',
    value: 'MLIB',
  },
  {
    label: 'MLLIB',
    value: 'MLLIB',
  },
  {
    label: 'MLOAD',
    value: 'MLOAD',
  },
  {
    label: 'MLP',
    value: 'MLP',
  },
  {
    label: 'MLR',
    value: 'MLR',
  },
  {
    label: 'MOBILE',
    value: 'MOBILE',
  },
  {
    label: 'MOBILE ANGULAR UI',
    value: 'MOBILE ANGULAR UI',
  },
  {
    label: 'MOBILE TESTING',
    value: 'MOBILE TESTING',
  },
  {
    label: 'MODEL EVALUATION',
    value: 'MODEL EVALUATION',
  },
  {
    label: 'MODELLING',
    value: 'MODELLING',
  },
  {
    label: 'MONGO',
    value: 'MONGO',
  },
  {
    label: 'MONGODB',
    value: 'MONGODB',
  },
  {
    label: 'MONGREL',
    value: 'MONGREL',
  },
  {
    label: 'MONORAIL',
    value: 'MONORAIL',
  },
  {
    label: 'MOREPATH',
    value: 'MOREPATH',
  },
  {
    label: 'MOSS',
    value: 'MOSS',
  },
  {
    label: 'MS ACCESS',
    value: 'MS ACCESS',
  },
  {
    label: 'MS ACTIVE DIRECTORY',
    value: 'MS ACTIVE DIRECTORY',
  },
  {
    label: 'MS DOS',
    value: 'MS DOS',
  },
  {
    label: 'MS EXCEL',
    value: 'MS EXCEL',
  },
  {
    label: 'MS OFFICE',
    value: 'MS OFFICE',
  },
  {
    label: 'MS OFFICE SUITE',
    value: 'MS OFFICE SUITE',
  },
  {
    label: 'MS POWER POINT',
    value: 'MS POWER POINT',
  },
  {
    label: 'MS POWERPOINT',
    value: 'MS POWERPOINT',
  },
  {
    label: 'MS PROJECT MANAGEMENT',
    value: 'MS PROJECT MANAGEMENT',
  },
  {
    label: 'MS SCCM 2012',
    value: 'MS SCCM 2012',
  },
  {
    label: 'MS SQL SERVER',
    value: 'MS SQL SERVER',
  },
  {
    label: 'MS SSAS',
    value: 'MS SSAS',
  },
  {
    label: 'MS SSMS',
    value: 'MS SSMS',
  },
  {
    label: 'MS VISIO',
    value: 'MS VISIO',
  },
  {
    label: 'MS VISUAL STUDIO .NET 2012',
    value: 'MS VISUAL STUDIO .NET 2012',
  },
  {
    label: 'MS WINDOWS 2000/XP DESKTOP',
    value: 'MS WINDOWS 2000/XP DESKTOP',
  },
  {
    label: 'MS WORD',
    value: 'MS WORD',
  },
  {
    label: 'MS/AZURE SQL',
    value: 'MS/AZURE SQL',
  },
  {
    label: 'MS/SQL',
    value: 'MS/SQL',
  },
  {
    label: 'MS-ACCESS',
    value: 'MS-ACCESS',
  },
  {
    label: 'MS-BUILD',
    value: 'MS-BUILD',
  },
  {
    label: 'MSI PACKAGING',
    value: 'MSI PACKAGING',
  },
  {
    label: 'MSSQL BI',
    value: 'MSSQL BI',
  },
  {
    label: 'MULE SOFT',
    value: 'MULE SOFT',
  },
  {
    label: 'MULTI LOAD',
    value: 'MULTI LOAD',
  },
  {
    label: 'MULTIPLE REGRESSION',
    value: 'MULTIPLE REGRESSION',
  },
  {
    label: 'MUMPS',
    value: 'MUMPS',
  },
  {
    label: 'MVC',
    value: 'MVC',
  },
  {
    label: 'MXNET',
    value: 'MXNET',
  },
  {
    label: 'MYSQL',
    value: 'MYSQL',
  },
  {
    label: 'MYSQL WORKBENCH',
    value: 'MYSQL WORKBENCH',
  },
  {
    label: 'NAGIOS',
    value: 'NAGIOS',
  },
  {
    label: 'NAIVE BAYES',
    value: 'NAIVE BAYES',
  },
  {
    label: 'NAIVE BAYES CLASSIFIER',
    value: 'NAIVE BAYES CLASSIFIER',
  },
  {
    label: 'NAMED ENTITY RECOGNITION (NER)',
    value: 'NAMED ENTITY RECOGNITION (NER)',
  },
  {
    label: 'NANCYFX',
    value: 'NANCYFX',
  },
  {
    label: 'NASCO MFS SYSTEM',
    value: 'NASCO MFS SYSTEM',
  },
  {
    label: 'NATURAL ADABAS',
    value: 'NATURAL ADABAS',
  },
  {
    label: 'NAVISPHERE',
    value: 'NAVISPHERE',
  },
  {
    label: 'NEO4J',
    value: 'NEO4J',
  },
  {
    label: 'NEPTUNE DB',
    value: 'NEPTUNE DB',
  },
  {
    label: 'NER',
    value: 'NER',
  },
  {
    label: 'NESSUS',
    value: 'NESSUS',
  },
  {
    label: 'NESTJS',
    value: 'NESTJS',
  },
  {
    label: 'NETAPP',
    value: 'NETAPP',
  },
  {
    label: 'NETBEANS',
    value: 'NETBEANS',
  },
  {
    label: 'NETEZZA',
    value: 'NETEZZA',
  },
  {
    label: 'NEURAL NETS',
    value: 'NEURAL NETS',
  },
  {
    label: 'NEURAL NETWORKS',
    value: 'NEURAL NETWORKS',
  },
  {
    label: 'NEW RELIC',
    value: 'NEW RELIC',
  },
  {
    label: 'NEWSQL',
    value: 'NEWSQL',
  },
  {
    label: 'NEXT.JS',
    value: 'NEXT.JS',
  },
  {
    label: 'NEXUS',
    value: 'NEXUS',
  },
  {
    label: 'NFS',
    value: 'NFS',
  },
  {
    label: 'NGINIX',
    value: 'NGINIX',
  },
  {
    label: 'NGINX',
    value: 'NGINX',
  },
  {
    label: 'NHIBERNATE',
    value: 'NHIBERNATE',
  },
  {
    label: 'NIAGRAFILES',
    value: 'NIAGRAFILES',
  },
  {
    label: 'NIFI',
    value: 'NIFI',
  },
  {
    label: 'NIGHTWATCH',
    value: 'NIGHTWATCH',
  },
  {
    label: 'NIGHTWATCH.JS',
    value: 'NIGHTWATCH.JS',
  },
  {
    label: 'NLP',
    value: 'NLP',
  },
  {
    label: 'NLP STACKS',
    value: 'NLP STACKS',
  },
  {
    label: 'NLTK',
    value: 'NLTK',
  },
  {
    label: 'NMIMS',
    value: 'NMIMS',
  },
  {
    label: 'NODE.JS',
    value: 'NODE.JS',
  },
  {
    label: 'NODEJS',
    value: 'NODEJS',
  },
  {
    label: 'NON-CONFORMANCE INCIDENTS',
    value: 'NON-CONFORMANCE INCIDENTS',
  },
  {
    label: 'NOSQL',
    value: 'NOSQL',
  },
  {
    label: 'NOSQL ARCHITECTURE',
    value: 'NOSQL ARCHITECTURE',
  },
  {
    label: 'NOTEBOOK',
    value: 'NOTEBOOK',
  },
  {
    label: 'NOTEBOOK/JUPYTER',
    value: 'NOTEBOOK/JUPYTER',
  },
  {
    label: 'NOTEPAD++',
    value: 'NOTEPAD++',
  },
  {
    label: 'NQF',
    value: 'NQF',
  },
  {
    label: 'NQUERY',
    value: 'NQUERY',
  },
  {
    label: 'NSIS',
    value: 'NSIS',
  },
  {
    label: 'NSTRUTS',
    value: 'NSTRUTS',
  },
  {
    label: 'NUMPY',
    value: 'NUMPY',
  },
  {
    label: 'NUNIT',
    value: 'NUNIT',
  },
  {
    label: 'NVISION',
    value: 'NVISION',
  },
  {
    label: 'NVIVO',
    value: 'NVIVO',
  },
  {
    label: 'NZSQL',
    value: 'NZSQL',
  },
  {
    label: 'NZSQL/NZLOAD',
    value: 'NZSQL/NZLOAD',
  },
  {
    label: 'O/S',
    value: 'O/S',
  },
  {
    label: 'OBIEE',
    value: 'OBIEE',
  },
  {
    label: 'OBIEEE',
    value: 'OBIEEE',
  },
  {
    label: 'OBJECT DETECTION',
    value: 'OBJECT DETECTION',
  },
  {
    label: 'OBJECT ORIENTED DESIGN',
    value: 'OBJECT ORIENTED DESIGN',
  },
  {
    label: 'OBJECT RECOGNITION',
    value: 'OBJECT RECOGNITION',
  },
  {
    label: 'OBJECTIVE C',
    value: 'OBJECTIVE C',
  },
  {
    label: 'OBJECTIVE-C (IOS)',
    value: 'OBJECTIVE-C (IOS)',
  },
  {
    label: 'OBJECTIVE-C++',
    value: 'OBJECTIVE-C++',
  },
  {
    label: 'OCTAVE',
    value: 'OCTAVE',
  },
  {
    label: 'OCTOPUS',
    value: 'OCTOPUS',
  },
  {
    label: 'ODBC',
    value: 'ODBC',
  },
  {
    label: 'OFFICE 365',
    value: 'OFFICE 365',
  },
  {
    label: 'OLAP',
    value: 'OLAP',
  },
  {
    label: 'OLAP CUBE STUDIO',
    value: 'OLAP CUBE STUDIO',
  },
  {
    label: 'OLAP TARGET SYSTEMS',
    value: 'OLAP TARGET SYSTEMS',
  },
  {
    label: 'OLEDB',
    value: 'OLEDB',
  },
  {
    label: 'OLE-DB',
    value: 'OLE-DB',
  },
  {
    label: 'OLEDB DESTINATION',
    value: 'OLEDB DESTINATION',
  },
  {
    label: 'OLS REGRESSION',
    value: 'OLS REGRESSION',
  },
  {
    label: 'OLTP',
    value: 'OLTP',
  },
  {
    label: 'OM',
    value: 'OM',
  },
  {
    label: 'ONSEN UI',
    value: 'ONSEN UI',
  },
  {
    label: 'OOB',
    value: 'OOB',
  },
  {
    label: 'OOD',
    value: 'OOD',
  },
  {
    label: 'OOZIE',
    value: 'OOZIE',
  },
  {
    label: 'OOZIE WORKFLOW',
    value: 'OOZIE WORKFLOW',
  },
  {
    label: 'OPEN AI',
    value: 'OPEN AI',
  },
  {
    label: 'OPEN LIBERTY',
    value: 'OPEN LIBERTY',
  },
  {
    label: 'OPEN OFFICE',
    value: 'OPEN OFFICE',
  },
  {
    label: 'OPENAM',
    value: 'OPENAM',
  },
  {
    label: 'OPENCL',
    value: 'OPENCL',
  },
  {
    label: 'OPENCLINICA',
    value: 'OPENCLINICA',
  },
  {
    label: 'OPENCV',
    value: 'OPENCV',
  },
  {
    label: 'OPENGL',
    value: 'OPENGL',
  },
  {
    label: 'OPENID',
    value: 'OPENID',
  },
  {
    label: 'OPENJDK',
    value: 'OPENJDK',
  },
  {
    label: 'OPENMP',
    value: 'OPENMP',
  },
  {
    label: 'OPENNLP',
    value: 'OPENNLP',
  },
  {
    label: 'OPENRDF',
    value: 'OPENRDF',
  },
  {
    label: 'OPENRESTY',
    value: 'OPENRESTY',
  },
  {
    label: 'OPENRTB',
    value: 'OPENRTB',
  },
  {
    label: 'OPENSCAP',
    value: 'OPENSCAP',
  },
  {
    label: 'OPENSHIFT',
    value: 'OPENSHIFT',
  },
  {
    label: 'OPENSHIFT CLI',
    value: 'OPENSHIFT CLI',
  },
  {
    label: 'OPENSSH',
    value: 'OPENSSH',
  },
  {
    label: 'OPENSTACK',
    value: 'OPENSTACK',
  },
  {
    label: 'OPENVINO',
    value: 'OPENVINO',
  },
  {
    label: 'OPENVX',
    value: 'OPENVX',
  },
  {
    label: 'OPENWHISK',
    value: 'OPENWHISK',
  },
  {
    label: 'OPENWRT',
    value: 'OPENWRT',
  },
  {
    label: 'OPSGENIE',
    value: 'OPSGENIE',
  },
  {
    label: 'OPTIMIZATION',
    value: 'OPTIMIZATION',
  },
  {
    label: 'ORACLE',
    value: 'ORACLE',
  },
  {
    label: 'ORACLE 11G/12C',
    value: 'ORACLE 11G/12C',
  },
  {
    label: 'ORACLE APEX',
    value: 'ORACLE APEX',
  },
  {
    label: 'ORACLE BI',
    value: 'ORACLE BI',
  },
  {
    label: 'ORACLE BPEL',
    value: 'ORACLE BPEL',
  },
  {
    label: 'ORACLE BUSINESS INTELLIGENCE',
    value: 'ORACLE BUSINESS INTELLIGENCE',
  },
  {
    label: 'ORACLE BUSINESS INTELLIGENCE ENTERPRISE EDITION',
    value: 'ORACLE BUSINESS INTELLIGENCE ENTERPRISE EDITION',
  },
  {
    label: 'ORACLE COES',
    value: 'ORACLE COES',
  },
  {
    label: 'ORACLE CRM',
    value: 'ORACLE CRM',
  },
  {
    label: 'ORACLE DATABASE SERVER',
    value: 'ORACLE DATABASE SERVER',
  },
  {
    label: 'ORACLE DB',
    value: 'ORACLE DB',
  },
  {
    label: 'ORACLE DESIGNER',
    value: 'ORACLE DESIGNER',
  },
  {
    label: 'ORACLE EBS',
    value: 'ORACLE EBS',
  },
  {
    label: 'ORACLE E-BUSINESS SUITE',
    value: 'ORACLE E-BUSINESS SUITE',
  },
  {
    label: 'ORACLE ELOQUA',
    value: 'ORACLE ELOQUA',
  },
  {
    label: 'ORACLE EPM',
    value: 'ORACLE EPM',
  },
  {
    label: 'ORACLE ERP',
    value: 'ORACLE ERP',
  },
  {
    label: 'ORACLE ESSBASE',
    value: 'ORACLE ESSBASE',
  },
  {
    label: 'ORACLE EXADATA',
    value: 'ORACLE EXADATA',
  },
  {
    label: 'ORACLE EXADATA-L2',
    value: 'ORACLE EXADATA-L2',
  },
  {
    label: 'ORACLE FORM',
    value: 'ORACLE FORM',
  },
  {
    label: 'ORACLE FORMS',
    value: 'ORACLE FORMS',
  },
  {
    label: 'ORACLE FUSION',
    value: 'ORACLE FUSION',
  },
  {
    label: 'ORACLE FUSION CLOUD',
    value: 'ORACLE FUSION CLOUD',
  },
  {
    label: 'ORACLE GOLDENGATE',
    value: 'ORACLE GOLDENGATE',
  },
  {
    label: 'ORACLE HCM',
    value: 'ORACLE HCM',
  },
  {
    label: 'ORACLE HCM CLOUD',
    value: 'ORACLE HCM CLOUD',
  },
  {
    label: 'ORACLE HFM',
    value: 'ORACLE HFM',
  },
  {
    label: 'ORACLE HRIS',
    value: 'ORACLE HRIS',
  },
  {
    label: 'ORACLE HYPERION',
    value: 'ORACLE HYPERION',
  },
  {
    label: 'ORACLE JDEVELOPER',
    value: 'ORACLE JDEVELOPER',
  },
  {
    label: 'ORACLE MEDIATOR',
    value: 'ORACLE MEDIATOR',
  },
  {
    label: 'ORACLE MYSQL SERVER 2010',
    value: 'ORACLE MYSQL SERVER 2010',
  },
  {
    label: 'ORACLE OEM',
    value: 'ORACLE OEM',
  },
  {
    label: 'ORACLE PL/SQL',
    value: 'ORACLE PL/SQL',
  },
  {
    label: 'ORACLE RAC 11G R.2',
    value: 'ORACLE RAC 11G R.2',
  },
  {
    label: 'ORACLE REPORTS',
    value: 'ORACLE REPORTS',
  },
  {
    label: 'ORACLE SERVICE BUS',
    value: 'ORACLE SERVICE BUS',
  },
  {
    label: 'ORACLE SOA',
    value: 'ORACLE SOA',
  },
  {
    label: 'ORACLE SOA 11G',
    value: 'ORACLE SOA 11G',
  },
  {
    label: 'ORACLE SOA CLOUD',
    value: 'ORACLE SOA CLOUD',
  },
  {
    label: 'ORACLE SOA SUITE',
    value: 'ORACLE SOA SUITE',
  },
  {
    label: 'ORACLE SOA SUITE 11G',
    value: 'ORACLE SOA SUITE 11G',
  },
  {
    label: 'ORACLE SOLARIS',
    value: 'ORACLE SOLARIS',
  },
  {
    label: 'ORACLE SQL',
    value: 'ORACLE SQL',
  },
  {
    label: 'ORACLE SQL * PLUS',
    value: 'ORACLE SQL * PLUS',
  },
  {
    label: 'ORACLE SQL DEVELOPER',
    value: 'ORACLE SQL DEVELOPER',
  },
  {
    label: 'ORACLE T5-2 SERVERS',
    value: 'ORACLE T5-2 SERVERS',
  },
  {
    label: 'ORACLE WEB LOGIC 10G/11G',
    value: 'ORACLE WEB LOGIC 10G/11G',
  },
  {
    label: 'ORANGE SURVEY',
    value: 'ORANGE SURVEY',
  },
  {
    label: 'ORCHESTRATION',
    value: 'ORCHESTRATION',
  },
  {
    label: 'ORM LITE',
    value: 'ORM LITE',
  },
  {
    label: 'ORYX 2',
    value: 'ORYX 2',
  },
  {
    label: 'OS/400',
    value: 'OS/400',
  },
  {
    label: 'OUTLOOK',
    value: 'OUTLOOK',
  },
  {
    label: 'P2P LENDING',
    value: 'P2P LENDING',
  },
  {
    label: 'PAAS',
    value: 'PAAS',
  },
  {
    label: 'PAGEMAKER',
    value: 'PAGEMAKER',
  },
  {
    label: "PAIR RDD'S",
    value: "PAIR RDD'S",
  },
  {
    label: 'PANDAS',
    value: 'PANDAS',
  },
  {
    label: 'PARQUET',
    value: 'PARQUET',
  },
  {
    label: 'PARTITIONING',
    value: 'PARTITIONING',
  },
  {
    label: 'PCA',
    value: 'PCA',
  },
  {
    label: 'PEEWEE',
    value: 'PEEWEE',
  },
  {
    label: 'PEGA TESTING',
    value: 'PEGA TESTING',
  },
  {
    label: 'PENTAHO',
    value: 'PENTAHO',
  },
  {
    label: 'PENTIUM',
    value: 'PENTIUM',
  },
  {
    label: 'PEOPLE SOFT',
    value: 'PEOPLE SOFT',
  },
  {
    label: 'PERFORCE',
    value: 'PERFORCE',
  },
  {
    label: 'PERFORMANCE POINT SERVER 2010.',
    value: 'PERFORMANCE POINT SERVER 2010.',
  },
  {
    label: 'PERFORMANCE TESTING',
    value: 'PERFORMANCE TESTING',
  },
  {
    label: 'PERL',
    value: 'PERL',
  },
  {
    label: 'PFIZER',
    value: 'PFIZER',
  },
  {
    label: 'PGMODELER',
    value: 'PGMODELER',
  },
  {
    label: 'PHONEGAP',
    value: 'PHONEGAP',
  },
  {
    label: 'PHP',
    value: 'PHP',
  },
  {
    label: 'PHP CODEIGNITER',
    value: 'PHP CODEIGNITER',
  },
  {
    label: 'PHPMYADMIN',
    value: 'PHPMYADMIN',
  },
  {
    label: 'PHYSICS',
    value: 'PHYSICS',
  },
  {
    label: 'PIG',
    value: 'PIG',
  },
  {
    label: 'PIGLATIN',
    value: 'PIGLATIN',
  },
  {
    label: 'PIVOTAL CLOUD',
    value: 'PIVOTAL CLOUD',
  },
  {
    label: 'PL/PGSQL',
    value: 'PL/PGSQL',
  },
  {
    label: 'PL/SQL',
    value: 'PL/SQL',
  },
  {
    label: 'PL/SQL BLOCKS',
    value: 'PL/SQL BLOCKS',
  },
  {
    label: 'PL/SQL DEVELOPER',
    value: 'PL/SQL DEVELOPER',
  },
  {
    label: 'PLAY FRAMEWORK',
    value: 'PLAY FRAMEWORK',
  },
  {
    label: 'PLOTLY',
    value: 'PLOTLY',
  },
  {
    label: 'PLOTLY JS',
    value: 'PLOTLY JS',
  },
  {
    label: 'PLUS',
    value: 'PLUS',
  },
  {
    label: 'PLUS DEVELOPER',
    value: 'PLUS DEVELOPER',
  },
  {
    label: 'PO  ',
    value: 'PO  ',
  },
  {
    label: 'PONY ORM',
    value: 'PONY ORM',
  },
  {
    label: 'PORTER STEMMER',
    value: 'PORTER STEMMER',
  },
  {
    label: 'POSTGIS',
    value: 'POSTGIS',
  },
  {
    label: 'POSTGRE DATABASE',
    value: 'POSTGRE DATABASE',
  },
  {
    label: 'POSTGRES',
    value: 'POSTGRES',
  },
  {
    label: 'POSTGRES AURORA',
    value: 'POSTGRES AURORA',
  },
  {
    label: 'POSTGRESQL',
    value: 'POSTGRESQL',
  },
  {
    label: 'POSTMAN',
    value: 'POSTMAN',
  },
  {
    label: 'POSTMAN API',
    value: 'POSTMAN API',
  },
  {
    label: 'POWER BI',
    value: 'POWER BI',
  },
  {
    label: 'POWER BI DESKTOP',
    value: 'POWER BI DESKTOP',
  },
  {
    label: 'POWER CENTER',
    value: 'POWER CENTER',
  },
  {
    label: 'POWER DESIGNER',
    value: 'POWER DESIGNER',
  },
  {
    label: 'POWER PIVOTS',
    value: 'POWER PIVOTS',
  },
  {
    label: 'POWER SHELL',
    value: 'POWER SHELL',
  },
  {
    label: 'PREDICTING',
    value: 'PREDICTING',
  },
  {
    label: 'PREDICTIVE ANALYSIS',
    value: 'PREDICTIVE ANALYSIS',
  },
  {
    label: 'PREDICTIVE ANALYTICS',
    value: 'PREDICTIVE ANALYTICS',
  },
  {
    label: 'PREDICTIVE MODELING',
    value: 'PREDICTIVE MODELING',
  },
  {
    label: 'PREDICTIVE MODELLING',
    value: 'PREDICTIVE MODELLING',
  },
  {
    label: 'PREDICTIVE MODELLING APPLICATION',
    value: 'PREDICTIVE MODELLING APPLICATION',
  },
  {
    label: 'PRESTO',
    value: 'PRESTO',
  },
  {
    label: 'PRIMAVERA',
    value: 'PRIMAVERA',
  },
  {
    label: 'PRIMAVERA ERP',
    value: 'PRIMAVERA ERP',
  },
  {
    label: 'PRINCIPAL COMPONENT ANALYSIS',
    value: 'PRINCIPAL COMPONENT ANALYSIS',
  },
  {
    label: 'PRO*C',
    value: 'PRO*C',
  },
  {
    label: 'PROBABILITY',
    value: 'PROBABILITY',
  },
  {
    label: 'PROCESS BUILDER',
    value: 'PROCESS BUILDER',
  },
  {
    label: 'PRODUCTIONIZING',
    value: 'PRODUCTIONIZING',
  },
  {
    label: 'PROLOG',
    value: 'PROLOG',
  },
  {
    label: 'PROMESH .NET',
    value: 'PROMESH .NET',
  },
  {
    label: 'PROTEUS',
    value: 'PROTEUS',
  },
  {
    label: 'PUPPET',
    value: 'PUPPET',
  },
  {
    label: 'PUTTY',
    value: 'PUTTY',
  },
  {
    label: 'PVCS',
    value: 'PVCS',
  },
  {
    label: 'PYCHARM',
    value: 'PYCHARM',
  },
  {
    label: 'PYCHARMMYSQL',
    value: 'PYCHARMMYSQL',
  },
  {
    label: 'PYLONS PROJECT',
    value: 'PYLONS PROJECT',
  },
  {
    label: 'PYMONGO',
    value: 'PYMONGO',
  },
  {
    label: 'PYQT5',
    value: 'PYQT5',
  },
  {
    label: 'PYRAMID',
    value: 'PYRAMID',
  },
  {
    label: 'PYSPARK',
    value: 'PYSPARK',
  },
  {
    label: 'PYSPARK-ML',
    value: 'PYSPARK-ML',
  },
  {
    label: 'PYSQL',
    value: 'PYSQL',
  },
  {
    label: 'PYTHON',
    value: 'PYTHON',
  },
  {
    label: 'PYTHON DJANGO',
    value: 'PYTHON DJANGO',
  },
  {
    label: 'PYTHON MATPLOTLIB',
    value: 'PYTHON MATPLOTLIB',
  },
  {
    label: 'PYTHON NLTK',
    value: 'PYTHON NLTK',
  },
  {
    label: 'PYTHON PANDAS',
    value: 'PYTHON PANDAS',
  },
  {
    label: 'PYTHON SCIKIT-LEARN',
    value: 'PYTHON SCIKIT-LEARN',
  },
  {
    label: 'PYTHON SCRIPTING',
    value: 'PYTHON SCRIPTING',
  },
  {
    label: 'PYTHON STREAMING',
    value: 'PYTHON STREAMING',
  },
  {
    label: 'PYTORCH',
    value: 'PYTORCH',
  },
  {
    label: 'QA TESTING',
    value: 'QA TESTING',
  },
  {
    label: 'Q-LEARNING',
    value: 'Q-LEARNING',
  },
  {
    label: 'QLIK NPRINT',
    value: 'QLIK NPRINT',
  },
  {
    label: 'QLIK REPLICATE',
    value: 'QLIK REPLICATE',
  },
  {
    label: 'QLIK SENSE',
    value: 'QLIK SENSE',
  },
  {
    label: 'QLIKSENSE',
    value: 'QLIKSENSE',
  },
  {
    label: 'QLIKVIEW',
    value: 'QLIKVIEW',
  },
  {
    label: 'QLOGIC',
    value: 'QLOGIC',
  },
  {
    label: 'QTP',
    value: 'QTP',
  },
  {
    label: 'QUALITY CENTER 9.0',
    value: 'QUALITY CENTER 9.0',
  },
  {
    label: 'QUANTUM GRID',
    value: 'QUANTUM GRID',
  },
  {
    label: 'QUBOLE',
    value: 'QUBOLE',
  },
  {
    label: 'QUERY ANALYZER',
    value: 'QUERY ANALYZER',
  },
  {
    label: 'QUICK DB ORM',
    value: 'QUICK DB ORM',
  },
  {
    label: 'QUICKSIGHT',
    value: 'QUICKSIGHT',
  },
  {
    label: 'QUIXOTE',
    value: 'QUIXOTE',
  },
  {
    label: 'QUOTAS',
    value: 'QUOTAS',
  },
  {
    label: 'R',
    value: 'R',
  },
  {
    label: 'R - STUDIO',
    value: 'R - STUDIO',
  },
  {
    label: 'R SERVER',
    value: 'R SERVER',
  },
  {
    label: 'R SHINY',
    value: 'R SHINY',
  },
  {
    label: 'R STUDIO MULTI LINEAR REGRESSION',
    value: 'R STUDIO MULTI LINEAR REGRESSION',
  },
  {
    label: 'R/R STUDIO',
    value: 'R/R STUDIO',
  },
  {
    label: 'RABBIT MQ',
    value: 'RABBIT MQ',
  },
  {
    label: 'RABBITMQ',
    value: 'RABBITMQ',
  },
  {
    label: 'RAILS',
    value: 'RAILS',
  },
  {
    label: 'RALLY',
    value: 'RALLY',
  },
  {
    label: 'RANDOM FOREST',
    value: 'RANDOM FOREST',
  },
  {
    label: 'RANDOM FOREST MODELLING',
    value: 'RANDOM FOREST MODELLING',
  },
  {
    label: 'RANDOM FOREST MODELS',
    value: 'RANDOM FOREST MODELS',
  },
  {
    label: 'RANDOM FOREST REGRESSION',
    value: 'RANDOM FOREST REGRESSION',
  },
  {
    label: 'RANOREX',
    value: 'RANOREX',
  },
  {
    label: 'RAPID SQL',
    value: 'RAPID SQL',
  },
  {
    label: 'RAPIDMINER',
    value: 'RAPIDMINER',
  },
  {
    label: 'RASA',
    value: 'RASA',
  },
  {
    label: 'RASA NLU',
    value: 'RASA NLU',
  },
  {
    label: 'RASPBERRY PI',
    value: 'RASPBERRY PI',
  },
  {
    label: 'RATIONAL CLEARCASE',
    value: 'RATIONAL CLEARCASE',
  },
  {
    label: 'RATIONAL ROSE',
    value: 'RATIONAL ROSE',
  },
  {
    label: 'RATTLE',
    value: 'RATTLE',
  },
  {
    label: 'RAVENDB',
    value: 'RAVENDB',
  },
  {
    label: 'RAY TRACING',
    value: 'RAY TRACING',
  },
  {
    label: 'RCMDR/RATTLE',
    value: 'RCMDR/RATTLE',
  },
  {
    label: 'RDBMS',
    value: 'RDBMS',
  },
  {
    label: 'RDDS',
    value: 'RDDS',
  },
  {
    label: 'RDS',
    value: 'RDS',
  },
  {
    label: 'REACT',
    value: 'REACT',
  },
  {
    label: 'REACT.JS',
    value: 'REACT.JS',
  },
  {
    label: 'REACTJS',
    value: 'REACTJS',
  },
  {
    label: 'REALM',
    value: 'REALM',
  },
  {
    label: 'RECOMMENDER SYSTEM',
    value: 'RECOMMENDER SYSTEM',
  },
  {
    label: 'RECSYS 2018',
    value: 'RECSYS 2018',
  },
  {
    label: 'RED HAT',
    value: 'RED HAT',
  },
  {
    label: 'RED HAT ENTERPRISE LINUX 6',
    value: 'RED HAT ENTERPRISE LINUX 6',
  },
  {
    label: 'RED HAT OPENSHIFT CONTAINER PLATFORM',
    value: 'RED HAT OPENSHIFT CONTAINER PLATFORM',
  },
  {
    label: 'REDCAP',
    value: 'REDCAP',
  },
  {
    label: 'REDHAT OPENSHIFT',
    value: 'REDHAT OPENSHIFT',
  },
  {
    label: 'REDHAWK',
    value: 'REDHAWK',
  },
  {
    label: 'REDIS',
    value: 'REDIS',
  },
  {
    label: 'REDISCACHE',
    value: 'REDISCACHE',
  },
  {
    label: 'REDISV',
    value: 'REDISV',
  },
  {
    label: 'REDMINE',
    value: 'REDMINE',
  },
  {
    label: 'REDUX',
    value: 'REDUX',
  },
  {
    label: 'REDUX.JS',
    value: 'REDUX.JS',
  },
  {
    label: 'REGRESSION',
    value: 'REGRESSION',
  },
  {
    label: 'REGRESSION ANALYSIS',
    value: 'REGRESSION ANALYSIS',
  },
  {
    label: 'REGRESSION BASED MODELS',
    value: 'REGRESSION BASED MODELS',
  },
  {
    label: 'REGRESSION BASED PREDICTIVE MODELS',
    value: 'REGRESSION BASED PREDICTIVE MODELS',
  },
  {
    label: 'REGRESSION SUITE',
    value: 'REGRESSION SUITE',
  },
  {
    label: 'REGRESSION TESTING',
    value: 'REGRESSION TESTING',
  },
  {
    label: 'REGRESSION/TIME SERIES',
    value: 'REGRESSION/TIME SERIES',
  },
  {
    label: 'REGULAR EXPRESSIONS',
    value: 'REGULAR EXPRESSIONS',
  },
  {
    label: 'REGULARIZATION (LASSO & RIDGE)',
    value: 'REGULARIZATION (LASSO & RIDGE)',
  },
  {
    label: 'REINFORCEMENT LEARNING',
    value: 'REINFORCEMENT LEARNING',
  },
  {
    label: 'RELATIONAL DBMS',
    value: 'RELATIONAL DBMS',
  },
  {
    label: 'REMEDY',
    value: 'REMEDY',
  },
  {
    label: 'RENDERING',
    value: 'RENDERING',
  },
  {
    label: 'REPLICATION SCHEDULES',
    value: 'REPLICATION SCHEDULES',
  },
  {
    label: 'REPORT.NET',
    value: 'REPORT.NET',
  },
  {
    label: 'REQUESTER DATA',
    value: 'REQUESTER DATA',
  },
  {
    label: 'REST',
    value: 'REST',
  },
  {
    label: 'REST API',
    value: 'REST API',
  },
  {
    label: 'REST API TESTING',
    value: 'REST API TESTING',
  },
  {
    label: 'REST ASSURED API',
    value: 'REST ASSURED API',
  },
  {
    label: 'REST WEB SERVICES',
    value: 'REST WEB SERVICES',
  },
  {
    label: 'RESTFUL SERVICES TESTING',
    value: 'RESTFUL SERVICES TESTING',
  },
  {
    label: 'RESTFUL WEB SERVICES',
    value: 'RESTFUL WEB SERVICES',
  },
  {
    label: 'RHEL',
    value: 'RHEL',
  },
  {
    label: 'RHEL7',
    value: 'RHEL7',
  },
  {
    label: 'RHINO',
    value: 'RHINO',
  },
  {
    label: 'RIDGE REGRESSION',
    value: 'RIDGE REGRESSION',
  },
  {
    label: 'RIDGE REGRESSOR',
    value: 'RIDGE REGRESSOR',
  },
  {
    label: 'RISK ANALYSIS',
    value: 'RISK ANALYSIS',
  },
  {
    label: 'RMSE',
    value: 'RMSE',
  },
  {
    label: 'RNN',
    value: 'RNN',
  },
  {
    label: 'RNN-LSTM',
    value: 'RNN-LSTM',
  },
  {
    label: 'ROUTE53',
    value: 'ROUTE53',
  },
  {
    label: 'ROUTING TABLES',
    value: 'ROUTING TABLES',
  },
  {
    label: 'RQM',
    value: 'RQM',
  },
  {
    label: 'RSPARK',
    value: 'RSPARK',
  },
  {
    label: 'R-STUDIO',
    value: 'R-STUDIO',
  },
  {
    label: 'RUBY',
    value: 'RUBY',
  },
  {
    label: 'RUBY ON RAILS',
    value: 'RUBY ON RAILS',
  },
  {
    label: 'RUNDECK',
    value: 'RUNDECK',
  },
  {
    label: 'S3',
    value: 'S3',
  },
  {
    label: 'S3 BUCKET',
    value: 'S3 BUCKET',
  },
  {
    label: 'SAAS',
    value: 'SAAS',
  },
  {
    label: 'SABSA',
    value: 'SABSA',
  },
  {
    label: 'SAGE MAKER',
    value: 'SAGE MAKER',
  },
  {
    label: 'SAGEMAKER STUDIO',
    value: 'SAGEMAKER STUDIO',
  },
  {
    label: 'SALESFORCE',
    value: 'SALESFORCE',
  },
  {
    label: 'SALESFORCE ADMINISTRATION',
    value: 'SALESFORCE ADMINISTRATION',
  },
  {
    label: 'SALESFORCE EINSTEIN',
    value: 'SALESFORCE EINSTEIN',
  },
  {
    label: 'SALESFORCE LIGHTNING',
    value: 'SALESFORCE LIGHTNING',
  },
  {
    label: 'SALESLOGIX',
    value: 'SALESLOGIX',
  },
  {
    label: 'SALT',
    value: 'SALT',
  },
  {
    label: 'SAMBA',
    value: 'SAMBA',
  },
  {
    label: 'SAMPLING TECHNIQUES',
    value: 'SAMPLING TECHNIQUES',
  },
  {
    label: 'SAMZA',
    value: 'SAMZA',
  },
  {
    label: 'SANIC',
    value: 'SANIC',
  },
  {
    label: 'SAP',
    value: 'SAP',
  },
  {
    label: 'SAP APEX',
    value: 'SAP APEX',
  },
  {
    label: 'SAP APO',
    value: 'SAP APO',
  },
  {
    label: 'SAP BO',
    value: 'SAP BO',
  },
  {
    label: 'SAP BO BI',
    value: 'SAP BO BI',
  },
  {
    label: 'SAP BOBI 4.0',
    value: 'SAP BOBI 4.0',
  },
  {
    label: 'SAP BOBO 4.0',
    value: 'SAP BOBO 4.0',
  },
  {
    label: 'SAP BUSINESS INTELLIGENCE',
    value: 'SAP BUSINESS INTELLIGENCE',
  },
  {
    label: 'SAP BUSINESS LOGIC',
    value: 'SAP BUSINESS LOGIC',
  },
  {
    label: 'SAP BUSINESS OBJECTS',
    value: 'SAP BUSINESS OBJECTS',
  },
  {
    label: 'SAP BUSINESSOBJECTS',
    value: 'SAP BUSINESSOBJECTS',
  },
  {
    label: 'SAP BW',
    value: 'SAP BW',
  },
  {
    label: 'SAP BW & INFOMATICA',
    value: 'SAP BW & INFOMATICA',
  },
  {
    label: 'SAP BW/HANA',
    value: 'SAP BW/HANA',
  },
  {
    label: 'SAP CRM',
    value: 'SAP CRM',
  },
  {
    label: 'SAP DATA',
    value: 'SAP DATA',
  },
  {
    label: 'SAP ECC',
    value: 'SAP ECC',
  },
  {
    label: 'SAP ECC 6.0',
    value: 'SAP ECC 6.0',
  },
  {
    label: 'SAP ECC 7.0',
    value: 'SAP ECC 7.0',
  },
  {
    label: 'SAP ERP',
    value: 'SAP ERP',
  },
  {
    label: 'SAP HANA',
    value: 'SAP HANA',
  },
  {
    label: 'SAP LUMIRA',
    value: 'SAP LUMIRA',
  },
  {
    label: 'SAP NETWEAVER',
    value: 'SAP NETWEAVER',
  },
  {
    label: 'SAP POWER DESIGNER',
    value: 'SAP POWER DESIGNER',
  },
  {
    label: 'SAP RELATED SOFTWARES',
    value: 'SAP RELATED SOFTWARES',
  },
  {
    label: 'SAP SE V 14.1(CRYSTAL REPORTS)',
    value: 'SAP SE V 14.1(CRYSTAL REPORTS)',
  },
  {
    label: 'SAS',
    value: 'SAS',
  },
  {
    label: 'SAS & EXCEL',
    value: 'SAS & EXCEL',
  },
  {
    label: 'SAS & HADOOP',
    value: 'SAS & HADOOP',
  },
  {
    label: 'SAS BASE',
    value: 'SAS BASE',
  },
  {
    label: 'SAS DI',
    value: 'SAS DI',
  },
  {
    label: 'SAS DI STUDIO',
    value: 'SAS DI STUDIO',
  },
  {
    label: 'SAS EG',
    value: 'SAS EG',
  },
  {
    label: 'SAS EM',
    value: 'SAS EM',
  },
  {
    label: 'SAS E-MINER',
    value: 'SAS E-MINER',
  },
  {
    label: 'SAS ENTERPRISE',
    value: 'SAS ENTERPRISE',
  },
  {
    label: 'SAS ENTERPRISE MINER',
    value: 'SAS ENTERPRISE MINER',
  },
  {
    label: 'SAS ETL',
    value: 'SAS ETL',
  },
  {
    label: 'SAS GRAPH',
    value: 'SAS GRAPH',
  },
  {
    label: 'SAS GRID MANAGER',
    value: 'SAS GRID MANAGER',
  },
  {
    label: 'SAS JMP',
    value: 'SAS JMP',
  },
  {
    label: 'SAS MANAGEMENT CONSOLE',
    value: 'SAS MANAGEMENT CONSOLE',
  },
  {
    label: 'SAS PROGRAMMING',
    value: 'SAS PROGRAMMING',
  },
  {
    label: 'SAS QC',
    value: 'SAS QC',
  },
  {
    label: 'SAS R',
    value: 'SAS R',
  },
  {
    label: 'SAS REPORTING',
    value: 'SAS REPORTING',
  },
  {
    label: 'SAS SQL',
    value: 'SAS SQL',
  },
  {
    label: 'SAS STUDIO',
    value: 'SAS STUDIO',
  },
  {
    label: 'SAS VA',
    value: 'SAS VA',
  },
  {
    label: 'SAS VIYA',
    value: 'SAS VIYA',
  },
  {
    label: 'SAS.PLSQL',
    value: 'SAS.PLSQL',
  },
  {
    label: 'SAS/ ACCESS',
    value: 'SAS/ ACCESS',
  },
  {
    label: 'SAS/ STAT',
    value: 'SAS/ STAT',
  },
  {
    label: 'SAS/ACCESS',
    value: 'SAS/ACCESS',
  },
  {
    label: 'SAS/BASE',
    value: 'SAS/BASE',
  },
  {
    label: 'SAS/CONNECT',
    value: 'SAS/CONNECT',
  },
  {
    label: 'SAS/ETL',
    value: 'SAS/ETL',
  },
  {
    label: 'SAS/GRAPH',
    value: 'SAS/GRAPH',
  },
  {
    label: 'SAS/MACRO',
    value: 'SAS/MACRO',
  },
  {
    label: 'SAS/MACROS',
    value: 'SAS/MACROS',
  },
  {
    label: 'SAS/SQL',
    value: 'SAS/SQL',
  },
  {
    label: 'SAS/STAT',
    value: 'SAS/STAT',
  },
  {
    label: 'SAS-EMINER',
    value: 'SAS-EMINER',
  },
  {
    label: 'SASM',
    value: 'SASM',
  },
  {
    label: 'SASS',
    value: 'SASS',
  },
  {
    label: 'SAX',
    value: 'SAX',
  },
  {
    label: 'SCALA',
    value: 'SCALA',
  },
  {
    label: 'SCALA NLP',
    value: 'SCALA NLP',
  },
  {
    label: 'SCALA PROGRAMMING SYSTEMS',
    value: 'SCALA PROGRAMMING SYSTEMS',
  },
  {
    label: 'SCALATRA',
    value: 'SCALATRA',
  },
  {
    label: 'SCEP',
    value: 'SCEP',
  },
  {
    label: 'SCHEMATRON',
    value: 'SCHEMATRON',
  },
  {
    label: 'SCIKIT AND SCIPY',
    value: 'SCIKIT AND SCIPY',
  },
  {
    label: 'SCIKIT LEARN',
    value: 'SCIKIT LEARN',
  },
  {
    label: 'SCIKITLEARN',
    value: 'SCIKITLEARN',
  },
  {
    label: 'SCIKIT-LEARN',
    value: 'SCIKIT-LEARN',
  },
  {
    label: 'SCIPY',
    value: 'SCIPY',
  },
  {
    label: 'SCOBOL',
    value: 'SCOBOL',
  },
  {
    label: 'SCOM',
    value: 'SCOM',
  },
  {
    label: 'SCOOP IMPALA',
    value: 'SCOOP IMPALA',
  },
  {
    label: 'SCOUTSUITE',
    value: 'SCOUTSUITE',
  },
  {
    label: 'SCRAPY',
    value: 'SCRAPY',
  },
  {
    label: 'SCRIPTING',
    value: 'SCRIPTING',
  },
  {
    label: 'SCRUM',
    value: 'SCRUM',
  },
  {
    label: 'SDLC',
    value: 'SDLC',
  },
  {
    label: 'SEABORN',
    value: 'SEABORN',
  },
  {
    label: 'SECURITY GROUPS',
    value: 'SECURITY GROUPS',
  },
  {
    label: 'SEEBEYOND',
    value: 'SEEBEYOND',
  },
  {
    label: 'SEGMENT',
    value: 'SEGMENT',
  },
  {
    label: 'SELENIUM',
    value: 'SELENIUM',
  },
  {
    label: 'SELENIUM DRIVER',
    value: 'SELENIUM DRIVER',
  },
  {
    label: 'SELENIUM IDE',
    value: 'SELENIUM IDE',
  },
  {
    label: 'SELENIUM WEBDRIVER',
    value: 'SELENIUM WEBDRIVER',
  },
  {
    label: 'SEMI-SUPERVISED LEARNING',
    value: 'SEMI-SUPERVISED LEARNING',
  },
  {
    label: 'SEMRUSH',
    value: 'SEMRUSH',
  },
  {
    label: 'SENCHA TOUCH',
    value: 'SENCHA TOUCH',
  },
  {
    label: 'SENSOR FUSION',
    value: 'SENSOR FUSION',
  },
  {
    label: 'SENTIMENT ANALYSIS',
    value: 'SENTIMENT ANALYSIS',
  },
  {
    label: 'SENTIMENTAL-ANALYSIS',
    value: 'SENTIMENTAL-ANALYSIS',
  },
  {
    label: 'SENTRY',
    value: 'SENTRY',
  },
  {
    label: 'SERVER AWS SERVER',
    value: 'SERVER AWS SERVER',
  },
  {
    label: 'SERVICENOW',
    value: 'SERVICENOW',
  },
  {
    label: 'SERVLET',
    value: 'SERVLET',
  },
  {
    label: 'SERVLETS',
    value: 'SERVLETS',
  },
  {
    label: 'SGML',
    value: 'SGML',
  },
  {
    label: 'SHARE POINT SERVER',
    value: 'SHARE POINT SERVER',
  },
  {
    label: 'SHAREPOINT',
    value: 'SHAREPOINT',
  },
  {
    label: 'SHAREPOINT ADMIN',
    value: 'SHAREPOINT ADMIN',
  },
  {
    label: 'SHAREPOINT CUSTOMIZATION',
    value: 'SHAREPOINT CUSTOMIZATION',
  },
  {
    label: 'SHAREPOINT DESIGNER',
    value: 'SHAREPOINT DESIGNER',
  },
  {
    label: 'SHAREPOINT OFFICE SERVER 2007',
    value: 'SHAREPOINT OFFICE SERVER 2007',
  },
  {
    label: 'SHAREPOINT PORTAL',
    value: 'SHAREPOINT PORTAL',
  },
  {
    label: 'SHAREPOINT PORTAL SERVER',
    value: 'SHAREPOINT PORTAL SERVER',
  },
  {
    label: 'SHAREPOINT SERVICES 3.0',
    value: 'SHAREPOINT SERVICES 3.0',
  },
  {
    label: 'SHAREPOINT SITE',
    value: 'SHAREPOINT SITE',
  },
  {
    label: 'SHELL',
    value: 'SHELL',
  },
  {
    label: 'SHELL SCRIPT',
    value: 'SHELL SCRIPT',
  },
  {
    label: 'SHELLIDE',
    value: 'SHELLIDE',
  },
  {
    label: 'SIEBEL',
    value: 'SIEBEL',
  },
  {
    label: 'SIEBEL TESTING',
    value: 'SIEBEL TESTING',
  },
  {
    label: 'SIGNALFX',
    value: 'SIGNALFX',
  },
  {
    label: 'SIGNALR',
    value: 'SIGNALR',
  },
  {
    label: 'SIKULI',
    value: 'SIKULI',
  },
  {
    label: 'SILK TESTING',
    value: 'SILK TESTING',
  },
  {
    label: 'SILVERLIGHT',
    value: 'SILVERLIGHT',
  },
  {
    label: 'SIMPLE STORAGE SERVICES',
    value: 'SIMPLE STORAGE SERVICES',
  },
  {
    label: 'SINGLETON',
    value: 'SINGLETON',
  },
  {
    label: 'SIRIUSXM',
    value: 'SIRIUSXM',
  },
  {
    label: 'SISENSE',
    value: 'SISENSE',
  },
  {
    label: 'SK-LEARN',
    value: 'SK-LEARN',
  },
  {
    label: 'SKLEARN LINEAR MODEL',
    value: 'SKLEARN LINEAR MODEL',
  },
  {
    label: 'SLA',
    value: 'SLA',
  },
  {
    label: 'SLIM FRAMEWORK',
    value: 'SLIM FRAMEWORK',
  },
  {
    label: 'SMART VIEW',
    value: 'SMART VIEW',
  },
  {
    label: 'SMARTY',
    value: 'SMARTY',
  },
  {
    label: 'SMOTE',
    value: 'SMOTE',
  },
  {
    label: 'SNAPSHOTS POLICIES',
    value: 'SNAPSHOTS POLICIES',
  },
  {
    label: 'SNOWFLAKE',
    value: 'SNOWFLAKE',
  },
  {
    label: 'SNS',
    value: 'SNS',
  },
  {
    label: 'SOA',
    value: 'SOA',
  },
  {
    label: 'SOAP',
    value: 'SOAP',
  },
  {
    label: 'SOAP SERVICES',
    value: 'SOAP SERVICES',
  },
  {
    label: 'SOLARIS',
    value: 'SOLARIS',
  },
  {
    label: 'SOLARIS 11',
    value: 'SOLARIS 11',
  },
  {
    label: 'SOLARIS 5.8',
    value: 'SOLARIS 5.8',
  },
  {
    label: 'SOLR',
    value: 'SOLR',
  },
  {
    label: 'SONAR',
    value: 'SONAR',
  },
  {
    label: 'SONAR/FORTIFY',
    value: 'SONAR/FORTIFY',
  },
  {
    label: 'SONARQUBE',
    value: 'SONARQUBE',
  },
  {
    label: 'SOP',
    value: 'SOP',
  },
  {
    label: 'SOQL',
    value: 'SOQL',
  },
  {
    label: 'SOSL',
    value: 'SOSL',
  },
  {
    label: 'SOURCE QUALIFIER',
    value: 'SOURCE QUALIFIER',
  },
  {
    label: 'SPACY',
    value: 'SPACY',
  },
  {
    label: 'SPARK',
    value: 'SPARK',
  },
  {
    label: 'SPARK APPS',
    value: 'SPARK APPS',
  },
  {
    label: 'SPARK CONTEXT',
    value: 'SPARK CONTEXT',
  },
  {
    label: 'SPARK DATAFRAMES',
    value: 'SPARK DATAFRAMES',
  },
  {
    label: 'SPARK FRAMEWORK',
    value: 'SPARK FRAMEWORK',
  },
  {
    label: 'SPARK ML',
    value: 'SPARK ML',
  },
  {
    label: 'SPARK MLIB',
    value: 'SPARK MLIB',
  },
  {
    label: 'SPARK PYTHON',
    value: 'SPARK PYTHON',
  },
  {
    label: "SPARK RDD'S",
    value: "SPARK RDD'S",
  },
  {
    label: 'SPARK SCRIPT',
    value: 'SPARK SCRIPT',
  },
  {
    label: 'SPARK SHELL TERMINAL HADOOP',
    value: 'SPARK SHELL TERMINAL HADOOP',
  },
  {
    label: 'SPARK SQL',
    value: 'SPARK SQL',
  },
  {
    label: 'SPARK SQL API',
    value: 'SPARK SQL API',
  },
  {
    label: 'SPARK STREAMING',
    value: 'SPARK STREAMING',
  },
  {
    label: 'SPARX',
    value: 'SPARX',
  },
  {
    label: 'SPEEDMENT',
    value: 'SPEEDMENT',
  },
  {
    label: 'SPINNAKER',
    value: 'SPINNAKER',
  },
  {
    label: 'SPLUNK',
    value: 'SPLUNK',
  },
  {
    label: 'SPLUNK MACHINE LEARNING',
    value: 'SPLUNK MACHINE LEARNING',
  },
  {
    label: 'SPOT',
    value: 'SPOT',
  },
  {
    label: 'SPOTFIRE',
    value: 'SPOTFIRE',
  },
  {
    label: 'SPRING BOOT',
    value: 'SPRING BOOT',
  },
  {
    label: 'SPRING MVC',
    value: 'SPRING MVC',
  },
  {
    label: 'SPRING.NET',
    value: 'SPRING.NET',
  },
  {
    label: 'SPSS',
    value: 'SPSS',
  },
  {
    label: 'SPYDER',
    value: 'SPYDER',
  },
  {
    label: 'SQL',
    value: 'SQL',
  },
  {
    label: 'SQL *LOADER SCRIPTS',
    value: 'SQL *LOADER SCRIPTS',
  },
  {
    label: 'SQL AZURE',
    value: 'SQL AZURE',
  },
  {
    label: 'SQL CONNECTOR',
    value: 'SQL CONNECTOR',
  },
  {
    label: 'SQL DATAWAREHOUSE',
    value: 'SQL DATAWAREHOUSE',
  },
  {
    label: 'SQL DB',
    value: 'SQL DB',
  },
  {
    label: 'SQL LOADER',
    value: 'SQL LOADER',
  },
  {
    label: 'SQL PROFILER',
    value: 'SQL PROFILER',
  },
  {
    label: 'SQL REPORTING SERVICES',
    value: 'SQL REPORTING SERVICES',
  },
  {
    label: 'SQL SEQUENCE',
    value: 'SQL SEQUENCE',
  },
  {
    label: 'SQL SERVER',
    value: 'SQL SERVER',
  },
  {
    label: 'SQL SERVER ENTERPRISE MANAGER',
    value: 'SQL SERVER ENTERPRISE MANAGER',
  },
  {
    label: 'SQL SERVER INTEGRATION SERVICE',
    value: 'SQL SERVER INTEGRATION SERVICE',
  },
  {
    label: 'SQL SERVER INTEGRATION SERVICES & SQL SERVER 2005',
    value: 'SQL SERVER INTEGRATION SERVICES & SQL SERVER 2005',
  },
  {
    label: 'SQL SERVER MANAGEMENT STUDIO',
    value: 'SQL SERVER MANAGEMENT STUDIO',
  },
  {
    label: 'SQL SERVER PROFILER',
    value: 'SQL SERVER PROFILER',
  },
  {
    label: 'SQL SERVER REPORTING SERVICES',
    value: 'SQL SERVER REPORTING SERVICES',
  },
  {
    label: 'SQL SERVER REPORTING SERVICES MSBI',
    value: 'SQL SERVER REPORTING SERVICES MSBI',
  },
  {
    label: 'SQL*LOADER CALLING UNIX',
    value: 'SQL*LOADER CALLING UNIX',
  },
  {
    label: 'SQL*PLUS',
    value: 'SQL*PLUS',
  },
  {
    label: 'SQL/400 AND ALDON',
    value: 'SQL/400 AND ALDON',
  },
  {
    label: 'SQL/PLSQL',
    value: 'SQL/PLSQL',
  },
  {
    label: 'SQLALCHEMY',
    value: 'SQLALCHEMY',
  },
  {
    label: 'SQLBI',
    value: 'SQLBI',
  },
  {
    label: 'SQLITE',
    value: 'SQLITE',
  },
  {
    label: 'SQLLITE',
    value: 'SQLLITE',
  },
  {
    label: 'SQLOBJECT',
    value: 'SQLOBJECT',
  },
  {
    label: 'SQOOP',
    value: 'SQOOP',
  },
  {
    label: 'SQS',
    value: 'SQS',
  },
  {
    label: 'SSAS',
    value: 'SSAS',
  },
  {
    label: 'SSIS',
    value: 'SSIS',
  },
  {
    label: 'SSISPACKAGES',
    value: 'SSISPACKAGES',
  },
  {
    label: 'SSMS',
    value: 'SSMS',
  },
  {
    label: 'SSRS',
    value: 'SSRS',
  },
  {
    label: 'SSRS 2008',
    value: 'SSRS 2008',
  },
  {
    label: 'STANFORD CORE NLP',
    value: 'STANFORD CORE NLP',
  },
  {
    label: 'STANFORD NLP',
    value: 'STANFORD NLP',
  },
  {
    label: 'STAR SCHEMA',
    value: 'STAR SCHEMA',
  },
  {
    label: 'STASH',
    value: 'STASH',
  },
  {
    label: 'STATA',
    value: 'STATA',
  },
  {
    label: 'STATISTICA',
    value: 'STATISTICA',
  },
  {
    label: 'STATISTICAL ANALYSIS',
    value: 'STATISTICAL ANALYSIS',
  },
  {
    label: 'STATISTICAL ANALYTICS',
    value: 'STATISTICAL ANALYTICS',
  },
  {
    label: 'STATISTICAL MODELING',
    value: 'STATISTICAL MODELING',
  },
  {
    label: 'STATISTICAL MODELLING',
    value: 'STATISTICAL MODELLING',
  },
  {
    label: 'STATISTICS',
    value: 'STATISTICS',
  },
  {
    label: 'STATMODELS',
    value: 'STATMODELS',
  },
  {
    label: 'STATS MODELS',
    value: 'STATS MODELS',
  },
  {
    label: 'STLC',
    value: 'STLC',
  },
  {
    label: 'STOCHASTIC GRADIENT DESCENT',
    value: 'STOCHASTIC GRADIENT DESCENT',
  },
  {
    label: 'STOCHASTIC MODELLING',
    value: 'STOCHASTIC MODELLING',
  },
  {
    label: 'STORM',
    value: 'STORM',
  },
  {
    label: 'STREAMING',
    value: 'STREAMING',
  },
  {
    label: 'STREAMSETS',
    value: 'STREAMSETS',
  },
  {
    label: 'STRINGR',
    value: 'STRINGR',
  },
  {
    label: 'STROM',
    value: 'STROM',
  },
  {
    label: 'STRUTS',
    value: 'STRUTS',
  },
  {
    label: 'STS',
    value: 'STS',
  },
  {
    label: 'STUDIO',
    value: 'STUDIO',
  },
  {
    label: 'SUBLIME TEXT',
    value: 'SUBLIME TEXT',
  },
  {
    label: 'SUBVERSION',
    value: 'SUBVERSION',
  },
  {
    label: 'SUGAR ORM',
    value: 'SUGAR ORM',
  },
  {
    label: 'SUN SOLARIS',
    value: 'SUN SOLARIS',
  },
  {
    label: 'SUPERVISED AND UNSUPERVISED MODELING',
    value: 'SUPERVISED AND UNSUPERVISED MODELING',
  },
  {
    label: 'SUPERVISED LEARNING',
    value: 'SUPERVISED LEARNING',
  },
  {
    label: 'SUPPORT VECTOR MACHINES',
    value: 'SUPPORT VECTOR MACHINES',
  },
  {
    label: 'SUSE LINUX',
    value: 'SUSE LINUX',
  },
  {
    label: 'SUSE LINUX SLES 9/10 SP3/11 SP1/SP3',
    value: 'SUSE LINUX SLES 9/10 SP3/11 SP1/SP3',
  },
  {
    label: 'SVD',
    value: 'SVD',
  },
  {
    label: 'SVM',
    value: 'SVM',
  },
  {
    label: 'SVM AN NAIVE BAYES',
    value: 'SVM AN NAIVE BAYES',
  },
  {
    label: 'SVM MATRIX FACTORIZATION',
    value: 'SVM MATRIX FACTORIZATION',
  },
  {
    label: 'SVM TREE',
    value: 'SVM TREE',
  },
  {
    label: 'SVN',
    value: 'SVN',
  },
  {
    label: 'SVR',
    value: 'SVR',
  },
  {
    label: 'SWAGGER',
    value: 'SWAGGER',
  },
  {
    label: 'SWF',
    value: 'SWF',
  },
  {
    label: 'SWIFT (IOS)',
    value: 'SWIFT (IOS)',
  },
  {
    label: 'SWOT',
    value: 'SWOT',
  },
  {
    label: 'SYBASE',
    value: 'SYBASE',
  },
  {
    label: 'SYBASE POWER DESIGNER',
    value: 'SYBASE POWER DESIGNER',
  },
  {
    label: 'SYMFONY',
    value: 'SYMFONY',
  },
  {
    label: 'SYNTHETIC MINORITY OVER SAMPLING TECHNIQUE (SMOTE',
    value: 'SYNTHETIC MINORITY OVER SAMPLING TECHNIQUE (SMOTE',
  },
  {
    label: 'SYNTHETIC MINORITY OVER SAMPLING TECHNIQUE (SMOTE)',
    value: 'SYNTHETIC MINORITY OVER SAMPLING TECHNIQUE (SMOTE)',
  },
  {
    label: 'SYSLOG',
    value: 'SYSLOG',
  },
  {
    label: 'T TEST',
    value: 'T TEST',
  },
  {
    label: 'TABLEAU',
    value: 'TABLEAU',
  },
  {
    label: 'TABLEAU READER',
    value: 'TABLEAU READER',
  },
  {
    label: 'TABLEAU SERVER',
    value: 'TABLEAU SERVER',
  },
  {
    label: 'TABLEAU UNIX COMMANDS',
    value: 'TABLEAU UNIX COMMANDS',
  },
  {
    label: 'TABLIX',
    value: 'TABLIX',
  },
  {
    label: 'TALEND',
    value: 'TALEND',
  },
  {
    label: 'TALEND DATA SERVICES',
    value: 'TALEND DATA SERVICES',
  },
  {
    label: 'TALEND OPEN STUDIO',
    value: 'TALEND OPEN STUDIO',
  },
  {
    label: 'TALEND STUDIO',
    value: 'TALEND STUDIO',
  },
  {
    label: 'TC AUTHORING & DESIGN',
    value: 'TC AUTHORING & DESIGN',
  },
  {
    label: 'TD SQL',
    value: 'TD SQL',
  },
  {
    label: 'TELERIK DATA ACCESS',
    value: 'TELERIK DATA ACCESS',
  },
  {
    label: 'TELSTRA',
    value: 'TELSTRA',
  },
  {
    label: 'TELSTRA DATA ANALYSIS',
    value: 'TELSTRA DATA ANALYSIS',
  },
  {
    label: 'TENSORFLOW',
    value: 'TENSORFLOW',
  },
  {
    label: 'TERADATA',
    value: 'TERADATA',
  },
  {
    label: 'TERADATA ADMINISTRATOR',
    value: 'TERADATA ADMINISTRATOR',
  },
  {
    label: 'TERADATA BTEQ',
    value: 'TERADATA BTEQ',
  },
  {
    label: 'TERADATA ETL',
    value: 'TERADATA ETL',
  },
  {
    label: 'TERADATA SQL ASSIST',
    value: 'TERADATA SQL ASSIST',
  },
  {
    label: 'TERADATA STUDIO',
    value: 'TERADATA STUDIO',
  },
  {
    label: 'TERADATA UTILITIES',
    value: 'TERADATA UTILITIES',
  },
  {
    label: 'TERADATA VANTAGE',
    value: 'TERADATA VANTAGE',
  },
  {
    label: 'TERADATA VIEWPOINT',
    value: 'TERADATA VIEWPOINT',
  },
  {
    label: 'TERRAFORM',
    value: 'TERRAFORM',
  },
  {
    label: 'TESTING',
    value: 'TESTING',
  },
  {
    label: 'TESTNG',
    value: 'TESTNG',
  },
  {
    label: 'TEXT ANALYSIS',
    value: 'TEXT ANALYSIS',
  },
  {
    label: 'TEXT ANALYTICS',
    value: 'TEXT ANALYTICS',
  },
  {
    label: 'TEXT ANALYTICS API',
    value: 'TEXT ANALYTICS API',
  },
  {
    label: 'TEXT CLUSTERING',
    value: 'TEXT CLUSTERING',
  },
  {
    label: 'TEXT MINING',
    value: 'TEXT MINING',
  },
  {
    label: 'TFS',
    value: 'TFS',
  },
  {
    label: 'THEANO',
    value: 'THEANO',
  },
  {
    label: 'THENAO',
    value: 'THENAO',
  },
  {
    label: 'THINGWORX',
    value: 'THINGWORX',
  },
  {
    label: 'THRIFT API',
    value: 'THRIFT API',
  },
  {
    label: 'TIBCO BUSINESS STUDIO 3.1',
    value: 'TIBCO BUSINESS STUDIO 3.1',
  },
  {
    label: 'TIBCO SPOTFIRE',
    value: 'TIBCO SPOTFIRE',
  },
  {
    label: 'TIME FUNCTIONS',
    value: 'TIME FUNCTIONS',
  },
  {
    label: 'TIME SERIES',
    value: 'TIME SERIES',
  },
  {
    label: 'TIME SERIES - ARIMA',
    value: 'TIME SERIES - ARIMA',
  },
  {
    label: 'TIME SERIES ANALYSIS',
    value: 'TIME SERIES ANALYSIS',
  },
  {
    label: 'TIME SERIES FORECASTING',
    value: 'TIME SERIES FORECASTING',
  },
  {
    label: 'TIVOLI',
    value: 'TIVOLI',
  },
  {
    label: 'TKINTER',
    value: 'TKINTER',
  },
  {
    label: 'TOAD',
    value: 'TOAD',
  },
  {
    label: 'TOAD SQL',
    value: 'TOAD SQL',
  },
  {
    label: 'TOKENIZATION',
    value: 'TOKENIZATION',
  },
  {
    label: 'TOMCAT',
    value: 'TOMCAT',
  },
  {
    label: 'TOMCAT ADMINISTRATION',
    value: 'TOMCAT ADMINISTRATION',
  },
  {
    label: 'TOMCAT SERVER',
    value: 'TOMCAT SERVER',
  },
  {
    label: 'TORCH',
    value: 'TORCH',
  },
  {
    label: 'TORNADO',
    value: 'TORNADO',
  },
  {
    label: 'TORONTO',
    value: 'TORONTO',
  },
  {
    label: 'TOSCA',
    value: 'TOSCA',
  },
  {
    label: 'TRANSACT-SQL',
    value: 'TRANSACT-SQL',
  },
  {
    label: 'TRAVIS',
    value: 'TRAVIS',
  },
  {
    label: 'TRAVIS CI',
    value: 'TRAVIS CI',
  },
  {
    label: 'TRIGGERS',
    value: 'TRIGGERS',
  },
  {
    label: 'T-SNE',
    value: 'T-SNE',
  },
  {
    label: 'T-SQL',
    value: 'T-SQL',
  },
  {
    label: 'T-STOCHASTICS NEIGHBORHOOD EMBEDDING (T-SNE',
    value: 'T-STOCHASTICS NEIGHBORHOOD EMBEDDING (T-SNE',
  },
  {
    label: 'T-STOCHASTICS NEIGHBORHOOD EMBEDDING (T-SNE)',
    value: 'T-STOCHASTICS NEIGHBORHOOD EMBEDDING (T-SNE)',
  },
  {
    label: 'T-TEST',
    value: 'T-TEST',
  },
  {
    label: 'TURBOGEARS',
    value: 'TURBOGEARS',
  },
  {
    label: 'TYPESCRIPT',
    value: 'TYPESCRIPT',
  },
  {
    label: 'UAT',
    value: 'UAT',
  },
  {
    label: 'UBUNTU',
    value: 'UBUNTU',
  },
  {
    label: 'UI DESIGN',
    value: 'UI DESIGN',
  },
  {
    label: 'UI DESIGNER',
    value: 'UI DESIGNER',
  },
  {
    label: 'UML',
    value: 'UML',
  },
  {
    label: 'UNIT TESTING',
    value: 'UNIT TESTING',
  },
  {
    label: 'UNIX',
    value: 'UNIX',
  },
  {
    label: 'UNIX SCRIPTING',
    value: 'UNIX SCRIPTING',
  },
  {
    label: 'UNIX SHELL SCRIPTS',
    value: 'UNIX SHELL SCRIPTS',
  },
  {
    label: 'UNIX SOLARIS',
    value: 'UNIX SOLARIS',
  },
  {
    label: 'UNIX/LINUX',
    value: 'UNIX/LINUX',
  },
  {
    label: 'UNSUPERVISED LEARNING',
    value: 'UNSUPERVISED LEARNING',
  },
  {
    label: 'USQL',
    value: 'USQL',
  },
  {
    label: 'UX DESIGN',
    value: 'UX DESIGN',
  },
  {
    label: 'VAADIN',
    value: 'VAADIN',
  },
  {
    label: 'VAGRANT',
    value: 'VAGRANT',
  },
  {
    label: 'VB',
    value: 'VB',
  },
  {
    label: 'VB SCRIPT',
    value: 'VB SCRIPT',
  },
  {
    label: 'VB.NET',
    value: 'VB.NET',
  },
  {
    label: 'VBA',
    value: 'VBA',
  },
  {
    label: 'VBA ACCESS',
    value: 'VBA ACCESS',
  },
  {
    label: 'VBA EXCEL',
    value: 'VBA EXCEL',
  },
  {
    label: 'VC++',
    value: 'VC++',
  },
  {
    label: 'VIRTUAL CENTRE',
    value: 'VIRTUAL CENTRE',
  },
  {
    label: 'VISTA',
    value: 'VISTA',
  },
  {
    label: 'VISUAL C++',
    value: 'VISUAL C++',
  },
  {
    label: 'VISUAL FORCE',
    value: 'VISUAL FORCE',
  },
  {
    label: 'VISUAL FOXPRO',
    value: 'VISUAL FOXPRO',
  },
  {
    label: 'VISUAL SOURCE SAFE 6.0',
    value: 'VISUAL SOURCE SAFE 6.0',
  },
  {
    label: 'VISUAL STUDIO 2015',
    value: 'VISUAL STUDIO 2015',
  },
  {
    label: 'VISUAL WEBGUI',
    value: 'VISUAL WEBGUI',
  },
  {
    label: 'VLOOKUP',
    value: 'VLOOKUP',
  },
  {
    label: 'VM',
    value: 'VM',
  },
  {
    label: 'VMWARE',
    value: 'VMWARE',
  },
  {
    label: 'VMWARE ESXI 5.5',
    value: 'VMWARE ESXI 5.5',
  },
  {
    label: 'VMWARE VSPHERE ESXI',
    value: 'VMWARE VSPHERE ESXI',
  },
  {
    label: 'VMXNET3',
    value: 'VMXNET3',
  },
  {
    label: 'VOIP TESTING',
    value: 'VOIP TESTING',
  },
  {
    label: 'VPC',
    value: 'VPC',
  },
  {
    label: 'VPC PEERING',
    value: 'VPC PEERING',
  },
  {
    label: 'VR',
    value: 'VR',
  },
  {
    label: 'VS 2010',
    value: 'VS 2010',
  },
  {
    label: 'VSAM',
    value: 'VSAM',
  },
  {
    label: 'VSPHERE',
    value: 'VSPHERE',
  },
  {
    label: 'VSPHERE 5.5',
    value: 'VSPHERE 5.5',
  },
  {
    label: 'WAS ADMIN',
    value: 'WAS ADMIN',
  },
  {
    label: 'WATERFALL MODEL',
    value: 'WATERFALL MODEL',
  },
  {
    label: 'WATSON',
    value: 'WATSON',
  },
  {
    label: 'WATSON ASSISTANT',
    value: 'WATSON ASSISTANT',
  },
  {
    label: 'WATSON DISCOVERY',
    value: 'WATSON DISCOVERY',
  },
  {
    label: 'WCF',
    value: 'WCF',
  },
  {
    label: 'WEB API',
    value: 'WEB API',
  },
  {
    label: 'WEB APPLICATION DEVELOPMENT',
    value: 'WEB APPLICATION DEVELOPMENT',
  },
  {
    label: 'WEB DESIGNING',
    value: 'WEB DESIGNING',
  },
  {
    label: 'WEB MVC',
    value: 'WEB MVC',
  },
  {
    label: 'WEB SCRAPING',
    value: 'WEB SCRAPING',
  },
  {
    label: 'WEB SERVER',
    value: 'WEB SERVER',
  },
  {
    label: 'WEB SERVERS',
    value: 'WEB SERVERS',
  },
  {
    label: 'WEB SERVICES',
    value: 'WEB SERVICES',
  },
  {
    label: 'WEB- SERVICES TESTING',
    value: 'WEB- SERVICES TESTING',
  },
  {
    label: 'WEB SERVICES USING WSDL',
    value: 'WEB SERVICES USING WSDL',
  },
  {
    label: 'WEB SITE DESIGN',
    value: 'WEB SITE DESIGN',
  },
  {
    label: 'WEB SPHERE',
    value: 'WEB SPHERE',
  },
  {
    label: 'WEB2PY',
    value: 'WEB2PY',
  },
  {
    label: 'WEBLOGIC',
    value: 'WEBLOGIC',
  },
  {
    label: 'WEBSHARP',
    value: 'WEBSHARP',
  },
  {
    label: 'WEKA',
    value: 'WEKA',
  },
  {
    label: 'WHITE BOX TESTING',
    value: 'WHITE BOX TESTING',
  },
  {
    label: 'WICKET',
    value: 'WICKET',
  },
  {
    label: 'WINDCHILL DEVELOPER',
    value: 'WINDCHILL DEVELOPER',
  },
  {
    label: 'WINDOWS',
    value: 'WINDOWS',
  },
  {
    label: 'WINDOWS CLIENT OSS',
    value: 'WINDOWS CLIENT OSS',
  },
  {
    label: 'WINDOWS MOBILE',
    value: 'WINDOWS MOBILE',
  },
  {
    label: 'WINDOWS NT',
    value: 'WINDOWS NT',
  },
  {
    label: 'WINDOWS OS',
    value: 'WINDOWS OS',
  },
  {
    label: 'WINDOWS SERVER',
    value: 'WINDOWS SERVER',
  },
  {
    label: 'WINDOWS SERVER OSS',
    value: 'WINDOWS SERVER OSS',
  },
  {
    label: 'WINDOWS SHAREPOINT SERVICES',
    value: 'WINDOWS SHAREPOINT SERVICES',
  },
  {
    label: 'WINFORMS',
    value: 'WINFORMS',
  },
  {
    label: 'WINRUNNER',
    value: 'WINRUNNER',
  },
  {
    label: 'WINSCP',
    value: 'WINSCP',
  },
  {
    label: 'WIRELESS TESTING',
    value: 'WIRELESS TESTING',
  },
  {
    label: 'WORD2VEC',
    value: 'WORD2VEC',
  },
  {
    label: 'WORKBENCH',
    value: 'WORKBENCH',
  },
  {
    label: 'WORKFLOW SERVICE (SWF)',
    value: 'WORKFLOW SERVICE (SWF)',
  },
  {
    label: 'WPF',
    value: 'WPF',
  },
  {
    label: 'WSDL',
    value: 'WSDL',
  },
  {
    label: 'WYSIWYG WEB BUILDER',
    value: 'WYSIWYG WEB BUILDER',
  },
  {
    label: 'XAMARIN',
    value: 'XAMARIN',
  },
  {
    label: 'XCODE',
    value: 'XCODE',
  },
  {
    label: 'XG BOOST',
    value: 'XG BOOST',
  },
  {
    label: 'XGB',
    value: 'XGB',
  },
  {
    label: 'XGBOOST',
    value: 'XGBOOST',
  },
  {
    label: 'XGBOOST REGRESSION',
    value: 'XGBOOST REGRESSION',
  },
  {
    label: 'XHTML',
    value: 'XHTML',
  },
  {
    label: 'XLERATE PLUS',
    value: 'XLERATE PLUS',
  },
  {
    label: 'XLMINER',
    value: 'XLMINER',
  },
  {
    label: 'XML',
    value: 'XML',
  },
  {
    label: 'XML-RPC',
    value: 'XML-RPC',
  },
  {
    label: 'XP',
    value: 'XP',
  },
  {
    label: 'XPATH',
    value: 'XPATH',
  },
  {
    label: 'XPEDITOR',
    value: 'XPEDITOR',
  },
  {
    label: 'XQUERY',
    value: 'XQUERY',
  },
  {
    label: 'XSD',
    value: 'XSD',
  },
  {
    label: 'XSTORE',
    value: 'XSTORE',
  },
  {
    label: 'XTREME GRADIENT BOOSTING(XGBM)',
    value: 'XTREME GRADIENT BOOSTING(XGBM)',
  },
  {
    label: 'YAML',
    value: 'YAML',
  },
  {
    label: 'YARN',
    value: 'YARN',
  },
  {
    label: 'YEOMAN',
    value: 'YEOMAN',
  },
  {
    label: 'YUGABYTEDB',
    value: 'YUGABYTEDB',
  },
  {
    label: 'Z/OS',
    value: 'Z/OS',
  },
  {
    label: 'ZABBIX',
    value: 'ZABBIX',
  },
  {
    label: 'ZACHMAN',
    value: 'ZACHMAN',
  },
  {
    label: 'ZACHMANFRAMEWORK',
    value: 'ZACHMANFRAMEWORK',
  },
  {
    label: 'ZEMAX',
    value: 'ZEMAX',
  },
  {
    label: 'ZENOSS',
    value: 'ZENOSS',
  },
  {
    label: 'ZEPELLIN',
    value: 'ZEPELLIN',
  },
  {
    label: 'ZEPLIN',
    value: 'ZEPLIN',
  },
  {
    label: 'ZEPPELIN',
    value: 'ZEPPELIN',
  },
  {
    label: 'ZLINUX',
    value: 'ZLINUX',
  },
  {
    label: 'ZOO KEEPER',
    value: 'ZOO KEEPER',
  },
  {
    label: 'ZOPE',
    value: 'ZOPE',
  },
  {
    label: 'ZOS',
    value: 'ZOS',
  },
  {
    label: 'Z-TEST',
    value: 'Z-TEST',
  },
  {
    label: 'ZYPHER',
    value: 'ZYPHER',
  },
  {
    label: '',
    value: '',
  },
];
