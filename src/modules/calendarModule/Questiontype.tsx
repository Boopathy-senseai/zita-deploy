export  interface LevelValue {
        name: string;
        easy: string;
        iseasycheck: boolean;
        medium: string;
        ismediumcheck: boolean;
        hard: string;
        ishardcheck: boolean;
        checked: boolean;
    }
 export   interface levellist {
        id: any;
        level: LevelValue[];
        role: string;
        sucess: boolean;
        lastname:any;
        firstname:any;
        totalError?: string;
    }
    export    interface questionid {
        id: any;
        question: string[];
       
    }
    export   interface addquestion {
        id: any;
        question: any;
        level: any;
        type: any;
        checked: boolean;
        attendees: any;
    }
    export    interface MyFormValues1 {
        levellist: levellist[];
        question: questionid[];
        questionid: string[];
        addquestion: addquestion[];
    }