export interface PageProps {
    current: number;
    pageSize: number;
}

export interface SearchProps {
    mechName: string;
    mechCode: string;
    mechPhone: string;
}

export interface ModalProps {
    visible: boolean;
    title: string;
    onCancel: () => void;
    mechList: any;
}