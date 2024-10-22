type Props = {
    params: {
        workspaceId: string;
    };
};

export default function WorkspacePage({ params }: Props) {
    const { workspaceId } = params;
    return <div> Page: {workspaceId}</div>;
}
