'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { StripeRedirectSchema, ReturnType } from './schema'
import { auth, currentUser } from '@clerk/nextjs/server'
import { createSafeAction } from '@/lib/create-safe-action'
import { absoluteUrl } from '@/lib/utils'
import { stripe } from '@/lib/stripe'

const handler = async (): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  const user = await currentUser()

  if (!userId || !orgId || !user) {
    return {
      error: 'Unauthorized',
    }
  }

  const settingsUrl = absoluteUrl(`/organization/${orgId}`)

  let url = ''

  try {
    const orgSubscription = await prisma.orgSubscription.findUnique({
      where: {
        orgId,
      },
    })

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })
      url = stripeSession.url
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: 'MissiOnly Pro',
                description: 'Unlimited boards for your organization',
              },
              unit_amount: 2000,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      })

      url = stripeSession.url || ''
    }
  } catch (error) {
    return {
      error: 'Something went wrong!',
    }
  }

  revalidatePath(`/organization/${orgId}`)
  return { data: url }
}

export const stripeRedirect = createSafeAction(StripeRedirectSchema, handler)
