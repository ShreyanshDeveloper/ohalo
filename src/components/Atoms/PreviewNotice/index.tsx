import Link from 'next/link';

type PreviewNoticeProps = {
  preview?: boolean | null;
};

const PreviewNotice = ({ preview }: PreviewNoticeProps) => {
  return preview ? (
    <div className='fixed bottom-0 left-0 flex w-full items-center justify-between bg-white/50 px-medium py-x-small backdrop-blur-sm'>
      <p>You are currently viewing the site in preview mode</p>
      <Link href={`/api/exit-preview`} prefetch={false}>
        <a className='underline'>Exit preview</a>
      </Link>
    </div>
  ) : null;
};

export default PreviewNotice;
