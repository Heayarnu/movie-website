import { getPaymentMethodDetails } from '@/actions/subscription';
import ManageAccount from '@/components/ManageAccount';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

const ProfilesPage = async () => {
  const user = await currentUser();
  const userId = user?.id;

  const plan = await db.userSubscription.findUnique({
    where: { userId: userId },
  });

  const customerId = plan?.stripeCustomerId;

  let cardDetails;

  if (customerId) {
    cardDetails = await getPaymentMethodDetails(customerId);
  }

  return (
    plan && <ManageAccount user={user} plan={plan} cardDetails={cardDetails} />
  );
};

export default ProfilesPage;
